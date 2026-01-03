# link

## Overview

A utility package to manage symlinks within the workspace, allowing for flexible project structures and the ability to toggle between symlinks and hard copies for deployment or isolation purposes.

## Status

Stable (v1.0.0)

## Features

- [x] Utility to create relative symlinks from JSON config
- [x] Toggle between symlinks and hard copies
- [x] Support for nested directory structures
- [x] Overwrite capability for existing links
- [x] Force hard copy creation option

## Architecture

The tool reads a configuration file (typically `link.json`) which maps source files to destination paths. It then iterates through these mappings to create the appropriate filesystem links or copies.

## API / CLI

### Usage

The tool is typically invoked via a script or directly using `ts-node` or similar on `src/index.ts`.

### Configuration (`link.json`)

A JSON file mapping destinations to sources:

```json
{
  "path/to/dest": "path/to/source"
}
```

## Dependencies

- Node.js fs module (standard library).
