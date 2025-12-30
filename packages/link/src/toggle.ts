import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const force = args.includes('-f') || args.includes('--force');
const configArg = args.find((arg) => !arg.startsWith('-'));

if (!configArg) {
  console.error('Please provide a link.json file.');
  process.exit(1);
}

const configFile = path.resolve(process.cwd(), configArg);

if (!fs.existsSync(configFile)) {
  console.error(`Config file not found: ${configFile}`);
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  processConfig(config, process.cwd(), [], force);
} catch (error) {
  console.error('Error parsing or processing config file:', error);
  process.exit(1);
}

function processConfig(obj: unknown, currentDir: string, configPath: string[], force: boolean) {
  if (!isPlainObject(obj)) {
    throw new Error(
      `Invalid config at ${formatConfigPath(
        configPath,
      )} in ${configFile}: expected an object, got ${describeType(obj)}`,
    );
  }

  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key];
    const nextDir = path.join(currentDir, key);
    const nextPath = [...configPath, key];

    if (Array.isArray(value)) {
      // It's a directory containing entries: strings (links) and/or objects (nested directories).
      ensureDirExists(nextDir);

      for (let i = 0; i < value.length; i++) {
        const entry = value[i];
        const entryPath = [...nextPath, `[${i}]`];

        if (typeof entry === 'string') {
          toggleFile(entry, nextDir, force);
          continue;
        }

        if (entry === null) {
          throw new Error(
            `Invalid config at ${formatConfigPath(
              entryPath,
            )} in ${configFile}: expected string or object, got null`,
          );
        }

        if (isPlainObject(entry)) {
          // Nested directory map(s) inside this directory.
          processConfig(entry, nextDir, entryPath, force);
          continue;
        }

        throw new Error(
          `Invalid config at ${formatConfigPath(
            entryPath,
          )} in ${configFile}: expected string or object, got ${describeType(entry)}`,
        );
      }
    } else if (isPlainObject(value)) {
      // Legacy nested directory structure.
      processConfig(value, nextDir, nextPath, force);
    } else if (value === null) {
      throw new Error(
        `Invalid config at ${formatConfigPath(
          nextPath,
        )} in ${configFile}: expected array or object, got null`,
      );
    } else {
      throw new Error(
        `Invalid config at ${formatConfigPath(
          nextPath,
        )} in ${configFile}: expected array or object, got ${describeType(value)}`,
      );
    }
  }
}

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

function toggleFile(sourcePath: string, dirPath: string, force: boolean) {
  const linkName = path.basename(sourcePath);
  const linkPath = path.join(dirPath, linkName);

  try {
    let stats: fs.Stats;
    try {
      stats = fs.lstatSync(linkPath);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        console.warn(`File not found: ${linkPath}. Skipping toggle.`);
        return;
      }
      throw error;
    }

    if (stats.isSymbolicLink()) {
      // It's a symlink. Convert to hard copy.
      if (force) {
        const absoluteSource = path.resolve(dirPath, sourcePath);
        fs.unlinkSync(linkPath);
        fs.copyFileSync(absoluteSource, linkPath);
        console.log(`Converted symlink to hard copy (forced from config): ${linkPath}`);
      } else {
        const target = fs.readlinkSync(linkPath);
        // The target might be relative. We need to resolve it relative to the link's directory.
        const absoluteTarget = path.resolve(dirPath, target);

        fs.unlinkSync(linkPath);
        fs.copyFileSync(absoluteTarget, linkPath);
        console.log(`Converted symlink to hard copy: ${linkPath}`);
      }
    } else if (stats.isFile()) {
      // It's a regular file. Convert to symlink.
      fs.unlinkSync(linkPath);
      fs.symlinkSync(sourcePath, linkPath);
      console.log(`Converted hard copy to symlink: ${linkPath}`);
    } else {
      console.warn(`Skipping ${linkPath}: Not a file or symlink.`);
    }
  } catch (err) {
    console.error(`Failed to toggle ${linkPath}:`, err);
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function describeType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function formatConfigPath(segments: string[]): string {
  if (segments.length === 0) return '(root)';

  let out = '';
  for (const seg of segments) {
    if (seg.startsWith('[')) {
      out += seg;
    } else if (out.length === 0) {
      out = seg;
    } else {
      out += `.${seg}`;
    }
  }
  return out;
}
