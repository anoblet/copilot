#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

type Options = { repo: string; message: string };

function usage(): never {
	console.error("Usage: node commit.ts --repo <path> --message <AI-generated message>");
	process.exit(2);
}

function parseArgs(args: string[]): Options {
	let repo = process.cwd();
	let message = "";

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];
		if (arg === "--repo" && args[index + 1]) repo = args[++index];
		else if (arg === "--message" && args[index + 1]) message = args[++index];
		else usage();
	}

	if (!message.trim()) usage();
	const header = message.split(/\r?\n/, 1)[0];
	if (!/^[a-z][a-z0-9-]*(\([^)]+\))?!?: .+$/.test(header)) {
		throw new Error("Commit message must use Conventional Commits format: type(scope): description");
	}
	return { repo: resolve(repo), message };
}

function git(repo: string, args: string[], inherit = false) {
	const result = spawnSync("git", ["-C", repo, ...args], {
		encoding: "utf8",
		stdio: inherit ? "inherit" : "pipe",
	});
	if (result.error) throw result.error;
	return result;
}

function main() {
	const { repo, message } = parseArgs(process.argv.slice(2));
	const root = git(repo, ["rev-parse", "--show-toplevel"]);
	if (root.status !== 0) throw new Error(`${repo} is not a Git working tree`);

	const upstream = git(repo, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
	if (upstream.status !== 0) throw new Error("Current branch has no configured upstream");

	const fetch = git(repo, ["fetch", "--quiet"]);
	if (fetch.status !== 0) throw new Error("Fetch failed; stopping before staging changes");

	const inSync = git(repo, ["merge-base", "--is-ancestor", upstream.stdout.trim(), "HEAD"]);
	if (inSync.status !== 0) throw new Error("Local branch is behind or diverged from its upstream");

	const add = git(repo, ["add", "-A"]);
	if (add.status !== 0) throw new Error("Could not stage repository changes");

	const check = git(repo, ["diff", "--cached", "--check"]);
	if (check.status !== 0) throw new Error("Staged diff check failed");

	const staged = git(repo, ["diff", "--cached", "--quiet"]);
	if (staged.status === 1) {
		const commit = git(repo, ["commit", "-m", message], true);
		if (commit.status !== 0) process.exit(commit.status ?? 1);
	} else if (staged.status !== 0) {
		throw new Error("Could not inspect staged changes");
	}

	const push = git(repo, ["push"], true);
	if (push.status !== 0) process.exit(push.status ?? 1);

	const verifyFetch = git(repo, ["fetch", "--quiet"]);
	if (verifyFetch.status !== 0) throw new Error("Push finished, but upstream refresh failed");
	const published = git(repo, ["merge-base", "--is-ancestor", "HEAD", upstream.stdout.trim()]);
	if (published.status !== 0) throw new Error("Upstream does not contain local HEAD after push");

	const head = git(repo, ["rev-parse", "--short", "HEAD"]);
	if (head.status !== 0) throw new Error("Published HEAD could not be read");
	console.log(`Published ${head.stdout.trim()} from ${root.stdout.trim()}`);
}

try {
	main();
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exit(1);
}
