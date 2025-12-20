import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a link.json file.");
  process.exit(1);
}

const configFile = path.resolve(process.cwd(), args[0]);

if (!fs.existsSync(configFile)) {
  console.error(`Config file not found: ${configFile}`);
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync(configFile, "utf8"));
  processConfig(config, process.cwd(), []);
} catch (error) {
  console.error("Error parsing or processing config file:", error);
  process.exit(1);
}

function processConfig(obj: unknown, currentDir: string, configPath: string[]) {
  if (!isPlainObject(obj)) {
    throw new Error(
      `Invalid config at ${formatConfigPath(
        configPath
      )} in ${configFile}: expected an object, got ${describeType(obj)}`
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

        if (typeof entry === "string") {
          linkIntoDir(entry, nextDir);
          continue;
        }

        if (entry === null) {
          throw new Error(
            `Invalid config at ${formatConfigPath(
              entryPath
            )} in ${configFile}: expected string or object, got null`
          );
        }

        if (isPlainObject(entry)) {
          // Nested directory map(s) inside this directory.
          processConfig(entry, nextDir, entryPath);
          continue;
        }

        throw new Error(
          `Invalid config at ${formatConfigPath(
            entryPath
          )} in ${configFile}: expected string or object, got ${describeType(
            entry
          )}`
        );
      }
    } else if (isPlainObject(value)) {
      // Legacy nested directory structure.
      processConfig(value, nextDir, nextPath);
    } else if (value === null) {
      throw new Error(
        `Invalid config at ${formatConfigPath(
          nextPath
        )} in ${configFile}: expected array or object, got null`
      );
    } else {
      throw new Error(
        `Invalid config at ${formatConfigPath(
          nextPath
        )} in ${configFile}: expected array or object, got ${describeType(
          value
        )}`
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

function linkIntoDir(sourcePath: string, dirPath: string) {
  const linkName = path.basename(sourcePath);
  const linkPath = path.join(dirPath, linkName);

  // sourcePath is the target of the symlink (relative path)
  // We want the symlink to contain exactly this string.

  try {
    // Check if it exists (dangling symlinks return false for existsSync, so check lstat)
    if (
      fs.existsSync(linkPath) ||
      fs.lstatSync(linkPath, { throwIfNoEntry: false })
    ) {
      fs.unlinkSync(linkPath);
    }
    fs.symlinkSync(sourcePath, linkPath);
    console.log(`Linked: ${linkPath} -> ${sourcePath}`);
  } catch (err) {
    console.error(`Failed to link ${linkPath} -> ${sourcePath}:`, err);
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function describeType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function formatConfigPath(segments: string[]): string {
  if (segments.length === 0) return "(root)";

  let out = "";
  for (const seg of segments) {
    if (seg.startsWith("[")) {
      out += seg;
    } else if (out.length === 0) {
      out = seg;
    } else {
      out += `.${seg}`;
    }
  }
  return out;
}
