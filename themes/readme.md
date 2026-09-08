# Themes

<!-- directory-responsibility -->
Defines editor color themes used by the development environment.

Key files: `github-dark-default.jsonc`, `unicorn-vampire.jsonc`.

```mermaid
flowchart LR
    A["Theme selection"] --> B["Load theme color definitions"]
    B --> C["Editor appearance"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
