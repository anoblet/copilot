import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a link.json file.');
  process.exit(1);
}

const configFile = path.resolve(process.cwd(), args[0]);

if (!fs.existsSync(configFile)) {
  console.error(`Config file not found: ${configFile}`);
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  processConfig(config, process.cwd());
} catch (error) {
  console.error('Error parsing or processing config file:', error);
  process.exit(1);
}

function processConfig(obj: any, currentDir: string) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const nextDir = path.join(currentDir, key);

    if (Array.isArray(value)) {
      // It's a list of files to link into nextDir
      if (!fs.existsSync(nextDir)) {
        fs.mkdirSync(nextDir, { recursive: true });
        console.log(`Created directory: ${nextDir}`);
      }

      for (const sourcePath of value) {
        const linkName = path.basename(sourcePath);
        const linkPath = path.join(nextDir, linkName);

        // sourcePath is the target of the symlink (relative path)
        // We want the symlink to contain exactly this string.

        try {
          // Check if it exists (dangling symlinks return false for existsSync, so check lstat)
          if (fs.existsSync(linkPath) || fs.lstatSync(linkPath, { throwIfNoEntry: false })) {
            fs.unlinkSync(linkPath);
          }
          fs.symlinkSync(sourcePath, linkPath);
          console.log(`Linked: ${linkPath} -> ${sourcePath}`);
        } catch (err) {
          console.error(`Failed to link ${linkPath} -> ${sourcePath}:`, err);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      // It's a nested directory structure
      processConfig(value, nextDir);
    } else {
      console.warn(`Unexpected value for key ${key}:`, value);
    }
  }
}
