# Session

<!-- directory-responsibility -->
Provides a utility for purging Copilot session directories.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `specification.md`.

```mermaid
flowchart LR
    A["Session cleanup request"] --> B["Select and remove session directories"]
    B --> C["Cleaned session storage"]
```
