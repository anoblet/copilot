# Shared

<!-- directory-responsibility -->
Defines user-input protocol messages shared by the MCP server and client.

Key files: `humanProtocol.ts`, `userInput.ts`.

```mermaid
flowchart LR
    A["Client or server message"] --> B["Apply shared protocol contracts"]
    B --> C["Compatible request and response data"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
