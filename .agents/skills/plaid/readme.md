# Plaid

<!-- directory-responsibility -->
Provides the Plaid skill. Use the @anoblet/copilot-plaid CLI to retrieve financial transactions and account data from the Plaid API, supporting sandbox and production environments with JSON or text output.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Plaid"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
