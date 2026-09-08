# Mcp

<!-- directory-responsibility -->
Provides an MCP user-input server and terminal client, with shared protocol definitions.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `package.json`, `specification.md`, `tsconfig.json`.

```mermaid
flowchart LR
    A["Agent input request"] --> B["Broker input between server and terminal"]
    B --> C["User response delivered to agent"]
```
