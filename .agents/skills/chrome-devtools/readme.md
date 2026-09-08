# Chrome devtools

<!-- directory-responsibility -->
Provides the Chrome devtools skill. Use Chrome DevTools MCP to inspect and control a live browser when a task depends on rendered state, console output, network traffic, audits, or performance traces instead of static code alone.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Chrome devtools"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
