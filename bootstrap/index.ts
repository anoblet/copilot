import { promises as fs } from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

type InstructionMap = Record<string, string>;

interface BootstrapConfig {
	instructions?: InstructionMap;
}

interface LoadedConfig {
	configPath: string;
	config: BootstrapConfig;
}

const workspaceRoot = path.resolve(__dirname, '..', '..');
const copilotDir = path.resolve(__dirname, '..');

async function pathExists(candidate: string): Promise<boolean> {
	try {
		await fs.lstat(candidate);
		return true;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

async function resolveTargetPath(relPath: string, configDir: string): Promise<string> {
	const bases = [configDir, copilotDir, workspaceRoot];

	for (const base of bases) {
		const absolute = path.resolve(base, relPath);

		if (await pathExists(absolute)) {
			return absolute;
		}
	}

	throw new Error(`Unable to resolve target for '${relPath}'.`);
}

async function ensureSymlink(target: string, linkPath: string): Promise<void> {
	await fs.mkdir(path.dirname(linkPath), { recursive: true });

	try {
		const stats = await fs.lstat(linkPath);

		if (!stats.isSymbolicLink()) {
			throw new Error(`Path '${linkPath}' exists and is not a symbolic link.`);
		}

		const currentTarget = await fs.readlink(linkPath);
		const resolvedCurrent = path.resolve(path.dirname(linkPath), currentTarget);

		if (resolvedCurrent === target) {
			return;
		}

		await fs.unlink(linkPath);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
			throw error;
		}
	}

	const relativeTarget = path.relative(path.dirname(linkPath), target);
	await fs.symlink(relativeTarget, linkPath);
}

async function runCommand(command: string, args: string[], cwd: string): Promise<void> {
	await new Promise<void>((resolve, reject) => {
		const child = spawn(command, args, { cwd, stdio: 'inherit' });

		child.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Command '${command} ${args.join(' ')}' exited with code ${code}.`));
			}
		});

		child.on('error', (error) => {
			reject(error);
		});
	});
}

async function loadBootstrapConfig(): Promise<LoadedConfig> {
	const candidatePaths = [path.resolve(__dirname, '../bootstrap.json'), path.resolve(__dirname, '../../bootstrap.json')];

	for (const candidate of candidatePaths) {
		if (await pathExists(candidate)) {
			const raw = await fs.readFile(candidate, 'utf-8');
			const config = JSON.parse(raw) as BootstrapConfig;

			return {
				configPath: candidate,
				config,
			};
		}
	}

	throw new Error('Unable to locate bootstrap.json configuration file.');
}

async function processInstructions(instructions: InstructionMap | undefined, configDir: string): Promise<void> {
	if (!instructions) {
		console.warn('No instructions defined in bootstrap configuration. Skipping symlink creation.');
		return;
	}

	for (const [name, relPath] of Object.entries(instructions)) {
		const target = await resolveTargetPath(relPath, configDir);
		const linkPath = path.resolve(copilotDir, '.github', 'instructions', `${name}.instructions.md`);

		await ensureSymlink(target, linkPath);
	}
}

async function main(): Promise<void> {
	const { config, configPath } = await loadBootstrapConfig();
	const configDir = path.dirname(configPath);

	await runCommand('git', ['submodule', 'init'], copilotDir);
	await runCommand('git', ['submodule', 'update', '--remote'], copilotDir);

	await processInstructions(config.instructions, configDir);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
