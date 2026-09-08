# Src

<!-- directory-responsibility -->
Implements the mcp package behavior. Provides an MCP user-input server and terminal client, with shared protocol definitions.

```mermaid
flowchart LR
    A["Agent input request"] --> B["Broker input between server and terminal"]
    B --> C["User response delivered to agent"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
