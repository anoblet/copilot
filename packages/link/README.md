# link

A utility to create relative symlinks based on a JSON configuration file. Useful for linking local packages or configuration files across a monorepo.

## Installation

This package is typically used within the workspace.

```bash
pnpm install
```

## Usage

Run the script with a configuration file as an argument.

```bash
node copilot/packages/link/src/index.ts link.json
```

## Configuration

The configuration file (e.g., `link.json`) defines the directory structure and the files to link.

**Example `link.json`:**

```json
{
  ".github": {
    "agents": [
      "../../copilot/agents/implement.agent.md",
      "../../copilot/agents/plan.agent.md"
    ]
  },
  ".vscode": [
    "../copilot/.vscode/settings.json"
  ]
}
```

**Structure:**
- Keys represent directories.
- Values can be:
    - An array of strings: Each string is a relative path to the source file. A symlink will be created in the current directory key with the same basename.
    - An object: Represents a subdirectory.

**Behavior:**
- Creates directories if they don't exist.
- Overwrites existing symlinks.
- Paths in the array are used as the symlink target (relative to the link location).

## Dependencies

*   `fs`: Node.js file system module.
*   `path`: Node.js path module.
