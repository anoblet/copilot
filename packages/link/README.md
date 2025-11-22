# Link

The goal of this package is to create a cli tool that will most likely be called from a consuming repository. For example:

Directory: `/homeassistant`:

```
pnpm run link link.json
```

Which calls:

```
node copilot/packages/link/src/index.ts link.json
```

The goal is to use a json file to create relative symlinks from one directory to another. This is useful for linking local packages during development.

Here is an example `link.json` file:

```json
{
  ".github": {
    "agents": [
      "../../copilot/agents/implement.agent.md",
      "../../copilot/agents/plan.agent.md",
      "../../copilot/agents/research.agent.md",
      "../../copilot/agents/review.agent.md"
    ]
  },
  ".vscode": ["../copilot/.vscode/mcp.json", "../copilot/.vscode/settings.json"]
}
```

All paths are relative. For example:

`.github/agents/implement.agent.md` will link to `copilot/agents/implement.agent.md`.
`.vscode/mcp.json` will link to `copilot/.vscode/mcp.json`.
