# link

A utility to create relative symlinks based on a JSON configuration file. Useful for linking local packages or configuration files across a monorepo.

## Installation

**Node.js requirement:** Node **>= 24** (this package runs directly from `src/index.ts`).

This package is typically used within the workspace.

```bash
pnpm install
```

## Usage

### Link

Run the script with a configuration file as an argument to create symlinks.

```bash
node copilot/packages/link/src/index.ts link.json
```

### Toggle

Run the script with a configuration file as an argument to toggle between symlinks and hard copies.

```bash
node copilot/packages/link/src/toggle.ts link.json
```

- **Symlink -> Hard Copy**: Useful for distribution or when symlinks are not supported.
- **Hard Copy -> Symlink**: Useful for development to keep files in sync.

## Configuration

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
