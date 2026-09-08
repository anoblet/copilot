# Scripts

<!-- directory-responsibility -->
Provides session lifecycle and skill-synchronization utilities.

Key files: `session-end.sh`, `sync-skills.ts`.

```mermaid
flowchart LR
    A["Maintenance or development request"] --> B["Run selected utility"]
    B --> C["Updated development environment"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
