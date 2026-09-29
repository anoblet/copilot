import * as fs from 'fs';
import * as path from 'path';

// Parse arguments
const args = process.argv.slice(2);
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`Usage: link [options] <config-file>

Options:
  --enable    Create symlinks (default)
  --disable   Convert symlinks to hard copies (detach)
  --toggle    Swap between symlinks and hard copies
  -f, --force Force operation
  -h, --help  Show this help message
`);
  process.exit(0);
}

const force = args.includes('-f') || args.includes('--force');
const enable = args.includes('--enable');
const disable = args.includes('--disable');
const toggle = args.includes('--toggle');
const configArg = args.find((arg) => !arg.startsWith('-'));

// Determine mode. Priority: disable > toggle > enable
let mode: 'enable' | 'disable' | 'toggle' = 'enable';
if (disable) mode = 'disable';
else if (toggle) mode = 'toggle';
else if (enable) mode = 'enable';

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
  processConfig(config, process.cwd(), [], mode, force);
} catch (error) {
  console.error('Error parsing or processing config file:', error);
  process.exit(1);
}

function processConfig(
  obj: unknown,
  currentDir: string,
  configPath: string[],
  mode: 'enable' | 'disable' | 'toggle',
  force: boolean,
) {
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
      ensureDirExists(nextDir);

      for (let i = 0; i < value.length; i++) {
        const entry = value[i];
        const entryPath = [...nextPath, `[${i}]`];

        if (typeof entry === 'string') {
          handleFile(entry, nextDir, mode, force);
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
          processConfig(entry, nextDir, entryPath, mode, force);
          continue;
        }

        throw new Error(
          `Invalid config at ${formatConfigPath(
            entryPath,
          )} in ${configFile}: expected string or object, got ${describeType(entry)}`,
        );
      }
    } else if (isPlainObject(value)) {
      processConfig(value, nextDir, nextPath, mode, force);
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

function handleFile(
  sourcePath: string,
  dirPath: string,
  mode: 'enable' | 'disable' | 'toggle',
  force: boolean,
) {
  const linkName = path.basename(sourcePath);
  const linkPath = path.join(dirPath, linkName);

  if (mode === 'enable') {
    createSymlink(sourcePath, linkPath, dirPath, force);
  } else if (mode === 'disable') {
    createHardCopy(sourcePath, linkPath, dirPath, force);
  } else if (mode === 'toggle') {
    toggleFile(sourcePath, linkPath, dirPath, force);
  }
}

function createSymlink(
  sourcePath: string,
  linkPath: string,
  dirPath: string,
  force: boolean,
) {
  try {
    const existing = getStatsOrUndefined(linkPath);

    if (existing) {
      if (existing.isSymbolicLink()) {
        const currentTarget = fs.readlinkSync(linkPath);
        if (currentTarget === sourcePath && !force) {
          // Already correct
          return;
        }
        // Incorrect target or force update
        removeEntry(linkPath);
      } else if (existing.isDirectory()) {
        if (!force) {
          console.warn(
            `Skipping ${linkPath}: Directory exists and is not a symlink. Use -f to overwrite.`,
          );
          return;
        }
        // Replace the conflicting directory with a symlink when forced.
        removeEntry(linkPath);
      } else if (existing.isFile()) {
        if (!force) {
          console.warn(
            `Skipping ${linkPath}: File exists and is not a symlink. Use -f to overwrite.`,
          );
          return;
        }
        removeEntry(linkPath);
      } else {
        console.warn(`Skipping ${linkPath}: Is not a file, directory, or symlink.`);
        return;
      }
    }

    fs.symlinkSync(sourcePath, linkPath, detectSourceType(dirPath, sourcePath));
    console.log(`Linked: ${linkPath} -> ${sourcePath}`);
  } catch (err) {
    console.error(`Failed to link ${linkPath} -> ${sourcePath}:`, err);
  }
}

function createHardCopy(sourcePath: string, linkPath: string, dirPath: string, force: boolean) {
  try {
    const existing = getStatsOrUndefined(linkPath);

    if (existing?.isSymbolicLink()) {
      // Convert symlink to a materialized copy (file or directory tree).
      const target = fs.readlinkSync(linkPath);
      // Resolve target relative to dirPath (location of symlink)
      const absoluteTarget = path.resolve(dirPath, target);

      removeEntry(linkPath);
      copyEntry(absoluteTarget, linkPath);
      console.log(`Converted symlink to hard copy: ${linkPath}`);
      return;
    }

    const absoluteSource = path.resolve(dirPath, sourcePath);

    if (existing) {
      if (!force) return; // Already a materialized entry; nothing to do.
      // Re-copy from source, replacing the existing file or directory tree.
      removeEntry(linkPath);
      copyEntry(absoluteSource, linkPath);
      console.log(`Refreshed hard copy: ${linkPath}`);
      return;
    }

    // Does not exist, create hard copy from source
    try {
      copyEntry(absoluteSource, linkPath);
      console.log(`Created hard copy: ${linkPath}`);
    } catch (e) {
      console.error(`Failed to copy source ${absoluteSource} to ${linkPath}:`, e);
    }
  } catch (err) {
    console.error(`Failed to disable link ${linkPath}:`, err);
  }
}

function toggleFile(sourcePath: string, linkPath: string, dirPath: string, force: boolean) {
  try {
    const existing = getStatsOrUndefined(linkPath);

    if (!existing) {
      console.warn(`Path not found: ${linkPath}. Skipping toggle.`);
      return;
    }

    if (existing.isSymbolicLink()) {
      // It's a symlink. Convert to a materialized copy (file or directory tree).
      const absoluteTarget = force
        ? path.resolve(dirPath, sourcePath)
        : path.resolve(dirPath, fs.readlinkSync(linkPath));

      removeEntry(linkPath);
      copyEntry(absoluteTarget, linkPath);
      console.log(
        force
          ? `Converted symlink to hard copy (forced from config): ${linkPath}`
          : `Converted symlink to hard copy: ${linkPath}`,
      );
      return;
    }

    if (existing.isFile() || existing.isDirectory()) {
      // It's a regular file or directory. Convert to a symlink.
      removeEntry(linkPath);
      fs.symlinkSync(sourcePath, linkPath, detectSourceType(dirPath, sourcePath));
      console.log(`Converted hard copy to symlink: ${linkPath}`);
      return;
    }

    console.warn(`Skipping ${linkPath}: Not a file, directory, or symlink.`);
  } catch (err) {
    console.error(`Failed to toggle ${linkPath}:`, err);
  }
}

function getStatsOrUndefined(targetPath: string): fs.Stats | undefined {
  try {
    return fs.lstatSync(targetPath);
  } catch (error: unknown) {
    if (isEnoent(error)) return undefined;
    throw error;
  }
}

function removeEntry(targetPath: string): void {
  // Removes a symlink, file, or directory (recursively) without following links.
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function copyEntry(sourcePath: string, destinationPath: string): void {
  // Copies a file or an entire directory tree.
  fs.cpSync(sourcePath, destinationPath, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });
}

function detectSourceType(dirPath: string, sourcePath: string): 'dir' | 'file' {
  // Windows needs the link type at creation time; default to a file link.
  try {
    return fs.statSync(path.resolve(dirPath, sourcePath)).isDirectory() ? 'dir' : 'file';
  } catch {
    return 'file';
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

function isEnoent(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 'ENOENT'
  );
}
