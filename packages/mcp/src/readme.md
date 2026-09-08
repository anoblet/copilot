# Src

<!-- directory-responsibility -->
Implements the mcp package behavior. Provides an MCP user-input server and terminal client, with shared protocol definitions.

```mermaid
flowchart LR
    A["Agent input request"] --> B["Broker input between server and terminal"]
    B --> C["User response delivered to agent"]
```
