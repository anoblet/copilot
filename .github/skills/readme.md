# Skills

<!-- directory-responsibility -->
Exposes skills for Copilot discovery, including linked capabilities where configured.

```mermaid
flowchart LR
    A["Copilot task"] --> B["Discover matching skill"]
    B --> C["Capability instructions"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
