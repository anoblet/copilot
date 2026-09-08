# Agents

<!-- directory-responsibility -->
Groups repository-specific agent skills and their supporting instructions.

```mermaid
flowchart LR
    A["Repository task"] --> B["Discover agent skills"]
    B --> C["Applicable task procedure"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
