# Plaid

<!-- directory-responsibility -->
Provides a CLI for retrieving Plaid account and transaction data in supported environments.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `package.json`, `specification.md`, `tsconfig.json`.

```mermaid
flowchart LR
    A["Account or transaction query"] --> B["Invoke Plaid API through CLI"]
    B --> C["Financial data output"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
