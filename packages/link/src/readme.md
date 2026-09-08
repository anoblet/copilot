# Src

<!-- directory-responsibility -->
Implements the link package behavior. Applies JSON mappings as symbolic links or materialized copies and verifies the configured mappings.

Key files: `index.ts`.

```mermaid
flowchart LR
    A["Link mappings"] --> B["Create links or copies"]
    B --> C["Configured filesystem layout"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
