# link

A utility to create relative symlinks based on a JSON configuration file.

## Features

- [x] Create relative symlinks from a JSON configuration file
- [x] Toggle between symlinks and hard copies
- [x] Support for nested directory structures
- [x] Overwrite existing symlinks
- [x] Force hard copy creation from config source

## Usage

```bash
# Create symlinks
node copilot/packages/link/src/index.ts link.json

# Toggle between symlinks and hard copies
node copilot/packages/link/src/index.ts link.json --toggle

# Force conversion from symlink to hard copy using the config source
node copilot/packages/link/src/index.ts link.json --toggle -f
```

## Specifications

### Commands

- `node src/index.ts`: Create symlinks.
- `node src/index.ts --toggle`: Toggle between symlinks and hard copies.

### Configuration

The configuration file (e.g., `link.json`) defines the directory structure and the files to link.

**Example `link.json`:**

```json
{
  ".github": [
    {
      "agents": [
        "../../copilot/agents/documentation.agent.md",
        "../../copilot/agents/feedback.agent.md",
        "../../copilot/agents/implement.agent.md",
        "../../copilot/agents/plan.agent.md",
        "../../copilot/agents/research.agent.md",
        "../../copilot/agents/review.agent.md",
        "../../copilot/agents/supervisor.agent.md"
      ]
    },
    "../../copilot/.github/copilot-instructions.md"
  ],
  ".vscode": ["../copilot/.vscode/mcp.json", "../copilot/.vscode/settings.json"]
}
```

**Structure:**

- Keys represent directories.
- Values can be:
  - An object (legacy): Nested directory structure.
  - An array of entries: Items can be either:
    - a string (a relative path to the source file to symlink into this directory), or
    - an object mapping one or more subdirectory names to nested values (arrays and/or objects).

**Behavior:**

- Creates directories if they don't exist.
- Overwrites existing symlinks.
- Paths in the array are used as the symlink target (relative to the link location).

## Dependencies

- `fs`: Node.js file system module.
- `path`: Node.js path module.
