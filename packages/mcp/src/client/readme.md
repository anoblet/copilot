# Client

<!-- directory-responsibility -->
Implements the terminal client that collects input for the MCP user-input server.

Key files: `index.ts`.

```mermaid
flowchart LR
    A["Pending user-input request"] --> B["Prompt terminal user"]
    B --> C["Response sent to server"]
```
