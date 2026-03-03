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

## Operational Rules

- Missing destination directories are created.
- `enable` mode creates symlinks and can overwrite existing files when forced.
- `disable` mode converts symlinks to copied files.
- `toggle` swaps file type:
  - symlink -> copied file
  - copied file -> symlink
- `--force` enables overwrite/refresh behavior where applicable.
