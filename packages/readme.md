# Packages

<!-- directory-responsibility -->
Groups separately configured packages that implement the repository capabilities.

```mermaid
flowchart LR
    A["Repository operation"] --> B["Select the responsible package"]
    B --> C["Package-owned result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
