# Server

<!-- directory-responsibility -->
Implements MCP server transports and the broker for user-input requests.

Key files: `index.ts`, `shared.ts`, `stdio.ts`, `userInputBroker.ts`.

```mermaid
flowchart LR
    A["MCP user-input invocation"] --> B["Broker request through stdio or HTTP"]
    B --> C["Correlated user response"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
