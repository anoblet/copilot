# Vscode

<!-- directory-responsibility -->
Configures editor extensions, settings, and integrations for this checkout.

Key files: `extensions.json`, `mcp.json`, `settings.json`.

```mermaid
flowchart LR
    A["Repository opened in editor"] --> B["Apply workspace configuration"]
    B --> C["Configured development environment"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
