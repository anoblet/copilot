# Home assistant

<!-- directory-responsibility -->
Provides the Home assistant skill. Use official Home Assistant concepts and documentation to work on configuration, automations, templates, integrations, frontend, dashboards, and debugging without assuming repository-specific wrappers or layouts.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Home assistant"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
