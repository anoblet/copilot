# Scripts

<!-- directory-responsibility -->
Verifies the filesystem link mappings owned by the link package.

Key files: `verify.ts`.

```mermaid
flowchart LR
    A["Configured link mappings"] --> B["Run verification utility"]
    B --> C["Mapping validation results"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
