# Dual Memory System Documentation

## Overview

The memory system has been separated into two distinct components to better organize context and preferences:

### User Memory (`memory/user.jsonl`)

- **Purpose**: Stores personal information and universal development preferences
- **Scope**: Applies across all projects and workspaces
- **Contains**:
  - Personal information (name, location, interests, background)
  - Universal development preferences (coding standards, tooling preferences)
  - Technology preferences (Astro, Lit, pnpm, Prettier, Husky, etc.)
  - Personal food and lifestyle preferences

### Project Memory (`memory/project.jsonl`)

- **Purpose**: Stores project-specific context, goals, and observations
- **Scope**: Isolated to the current project workspace
- **Contains**:
  - Project-specific goals and requirements
  - Architecture and design decisions for this project
  - Temporary context relevant only to current work
  - Project-specific configurations or preferences

## MCP Server Configuration

Both memory systems are configured in `.vscode/mcp.json`:

```json
{
  "servers": {
    "user-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "${workspaceFolder}/memory/user.jsonl"
      }
    },
    "project-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "${workspaceFolder}/memory/project.jsonl"
      }
    }
  }
}
```

## Usage Guidelines

### When to use User Memory:

- Personal information or preferences
- Universal development standards
- Tool/technology preferences that apply to all projects
- Personal interests and background

### When to use Project Memory:

- Project-specific goals or requirements
- Architecture decisions for this project
- Project-specific configurations
- Temporary context for current work

## Migration

All existing user data has been migrated from the old unified memory system to the appropriate new system:

- Personal information → User Memory
- Development preferences → User Memory
- Project-specific data → Project Memory (currently empty, ready for project-specific observations)

## Restart Required

After making these changes, VS Code should be restarted to initialize the new MCP server configurations.
