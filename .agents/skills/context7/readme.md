# Context7

<!-- directory-responsibility -->
Provides the Context7 skill. Use Context7 to look up current third-party library and framework documentation, API references, setup guidance, and version-specific code examples when a task depends on external package behavior rather than model memory alone.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Context7"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
