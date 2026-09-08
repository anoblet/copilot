# Hooks

<!-- directory-responsibility -->
Configures lifecycle hooks used by assistant workflows.

Key files: `index.json`.

```mermaid
flowchart LR
    A["Assistant lifecycle event"] --> B["Read hook configuration"]
    B --> C["Configured hook invocation"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
