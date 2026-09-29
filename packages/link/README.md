# Copilot link (@anoblet/copilot-link)

Filesystem linking utility for applying JSON mappings as symlinks or hard copies.

## Features

- Enable symlinks from config (`--enable`, default mode)
- Disable symlinks by materializing hard copies (`--disable`)
- Toggle between symlink and hard-copy states (`--toggle`)
- Force overwrite/refresh behavior (`-f`, `--force`)
- Support nested directory mapping structures
- Link entire directories (files or directory trees) in every mode

## Usage

```bash
node copilot/packages/link/src/index.ts link.json --enable
node copilot/packages/link/src/index.ts link.json --disable
node copilot/packages/link/src/index.ts link.json --toggle
node copilot/packages/link/src/index.ts link.json --toggle --force
```

## Flags

- `--enable`: create/refresh symlinks (default if no mode flag is given)
- `--disable`: replace symlinks with hard copies
- `--toggle`: convert symlinks to files and files to symlinks
- `-f, --force`: force overwrite/refresh behavior
- `-h, --help`: show CLI help

Mode priority in argument parsing is: `--disable` > `--toggle` > `--enable`.

## Configuration Shape

Top-level object keys are destination directories relative to current working directory. Values may be:

- array entries with source-path strings
- nested objects for subdirectories
- arrays that mix strings and nested objects

Each source-path string names a file **or a directory**. The symlink or copy is named after the
source's basename and is created inside the destination directory. With `-f`, an existing real
directory at the link path is replaced when creating a symlink, and a materialized directory is
refreshed when creating a copy.

Example (`/homeassistant/link.json` excerpt):

```json
{
  ".github": [
    {
      "agents": [
        "../../copilot/.github/agents/documentation.agent.md",
        "../../copilot/.github/agents/implement.agent.md"
      ]
    },
    "../copilot/.github/copilot-instructions.md"
  ],
  ".vscode": ["../copilot/.vscode/mcp.json", "../copilot/.vscode/settings.json"]
}
```
