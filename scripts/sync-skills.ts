#!/usr/bin/env node

/**
 * @file Sync skills from `copilot/skills/` to the OpenClaw global managed
 * skills directory so they are available to all agents and workspaces.
 *
 * Principle:
 *   Authoritative source → copilot/skills/<name>/SKILL.md
 *   OpenClaw picks it up  → ~/.openclaw/skills/<name>/SKILL.md  (openclaw-managed)
 *
 * This avoids per-workspace copies and the symlink-escape restriction.
 *
 * Usage:
 *   node scripts/sync-skills.ts                  # Sync all skills
 *   node scripts/sync-skills.ts plaid             # Sync only the plaid skill
 *   node scripts/sync-skills.ts --dry-run         # Preview without installing
 *   node scripts/sync-skills.ts plaid --dry-run   # Preview a single skill
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ───────────────────────────────────────────────────────────────

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const SKILLS_SOURCE = join(ROOT, "skills");

// ── Helpers ─────────────────────────────────────────────────────────────

/** Get skill names from copilot/skills/ that contain a SKILL.md. */
function getSkills(): string[] {
  if (!existsSync(SKILLS_SOURCE)) return [];
  return readdirSync(SKILLS_SOURCE).filter((name) => {
    const skillDir = join(SKILLS_SOURCE, name);
    return (
      statSync(skillDir).isDirectory() && existsSync(join(skillDir, "SKILL.md"))
    );
  });
}

// ── Main ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const filter = args.find((a) => !a.startsWith("--"));
const skills = filter ? [filter] : getSkills();

if (skills.length === 0) {
  console.log("No skills found to sync.");
  process.exit(0);
}

console.log(
  `Syncing ${skills.length} skill(s): ${skills.join(", ")}${isDryRun ? " (dry-run)" : ""}\n`,
);

let successCount = 0;
let failCount = 0;

for (const name of skills) {
  const skillDir = join(SKILLS_SOURCE, name);

  if (!existsSync(skillDir) || !existsSync(join(skillDir, "SKILL.md"))) {
    console.warn(`  ⚠  "${name}" has no SKILL.md, skipping.`);
    failCount++;
    continue;
  }

  const cmd = [
    `openclaw skills install "${skillDir}"`,
    `--as "${name}"`,
    "--global",
    "--force",
    "2>&1",
  ].join(" ");

  try {
    if (isDryRun) {
      console.log(`  ✓  would install: ${name} (${skillDir})`);
    } else {
      const output = execSync(cmd, {
        encoding: "utf-8",
        timeout: 60_000,
      }).trim();
      console.log(`  ✓  ${output.split("\n").pop()}`);
    }
    successCount++;
  } catch (err) {
    console.error(
      `  ✗  "${name}" install failed:`,
      (err as Error).message.split("\n")[0],
    );
    failCount++;
  }
}

console.log(`\nDone — ${successCount} succeeded, ${failCount} failed.`);
