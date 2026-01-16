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
    createSymlink(sourcePath, linkPath, force);
  } else if (mode === 'disable') {
    createHardCopy(sourcePath, linkPath, dirPath, force);
  } else if (mode === 'toggle') {
    toggleFile(sourcePath, linkPath, dirPath, force);
  }
}

function createSymlink(sourcePath: string, linkPath: string, force: boolean) {
  try {
    let stats: fs.Stats | undefined;
    try {
      stats = fs.lstatSync(linkPath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') throw error;
    }

    if (stats) {
      if (stats.isSymbolicLink()) {
        const currentTarget = fs.readlinkSync(linkPath);
        if (currentTarget === sourcePath && !force) {
          // Already correct
          return;
        }
        // Incorrect target or force update
        fs.unlinkSync(linkPath);
      } else if (stats.isFile()) {
        if (force) {
            fs.unlinkSync(linkPath);
        } else {
            console.warn(`Skipping ${linkPath}: File exists and is not a symlink. Use -f to overwrite.`);
            return;
        }
      } else {
        // Directory or other?
        console.warn(`Skipping ${linkPath}: Is not a file or symlink.`);
        return;
      }
    }

    fs.symlinkSync(sourcePath, linkPath);
    console.log(`Linked: ${linkPath} -> ${sourcePath}`);
  } catch (err) {
    console.error(`Failed to link ${linkPath} -> ${sourcePath}:`, err);
  }
}

function createHardCopy(sourcePath: string, linkPath: string, dirPath: string, force: boolean) {
    try {
        let stats: fs.Stats | undefined;
        try {
            stats = fs.lstatSync(linkPath);
        } catch (error: any) {
            if (error.code !== 'ENOENT') throw error;
        }

        if (stats) {
            if (stats.isSymbolicLink()) {
                // Convert symlink to hard copy
                const target = fs.readlinkSync(linkPath);
                // Resolve target relative to dirPath (location of symlink)
                const absoluteTarget = path.resolve(dirPath, target);
                
                fs.unlinkSync(linkPath);
                fs.copyFileSync(absoluteTarget, linkPath);
                console.log(`Converted symlink to hard copy: ${linkPath}`);
            } else if (stats.isFile()) {
               if (force) {
                   // Re-copy from source?
                   const absoluteSource = path.resolve(dirPath, sourcePath);
                    fs.copyFileSync(absoluteSource, linkPath);
                    console.log(`Refreshed hard copy: ${linkPath}`);
               }
               // Else already a file, do nothing
            }
        } else {
             // Does not exist, create hard copy from source
             const absoluteSource = path.resolve(dirPath, sourcePath);
             try {
                fs.copyFileSync(absoluteSource, linkPath);
                console.log(`Created hard copy: ${linkPath}`);
             } catch(e) {
                 console.error(`Failed to copy source ${absoluteSource} to ${linkPath}:`, e);
             }
        }
    } catch(err) {
        console.error(`Failed to disable link ${linkPath}:`, err);
    }
}

function toggleFile(sourcePath: string, linkPath: string, dirPath: string, force: boolean) {
  try {
    let stats: fs.Stats;
    try {
      stats = fs.lstatSync(linkPath);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'ENOENT') {
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
