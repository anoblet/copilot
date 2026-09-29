# @anoblet/copilot-link specification

## Purpose

Create and manage linked configuration files/directories from a JSON mapping.

## Command

```bash
node src/index.ts <config-file> [--enable|--disable|--toggle] [-f|--force]
```

## Mode Resolution

Default mode is `enable`.

Priority when multiple mode flags are present:

1. `--disable`
2. `--toggle`
3. `--enable`

## Config Contract

- Root value must be an object.
- Each key is a destination directory under current working directory.
- Value types allowed:
  - array of strings and/or nested objects
  - nested object
- Strings represent source paths used as symlink targets.
- Source paths may reference files or directories; directories are linked or copied as a whole.

## Operational Rules

- Missing destination directories are created.
- `enable` mode creates symlinks and can overwrite existing files or directories when forced.
- `disable` mode converts symlinks to copied files or directory trees.
- `toggle` swaps entry type:
  - symlink -> copied file or directory tree
  - copied file or directory tree -> symlink
- `--force` enables overwrite/refresh behavior where applicable.
