# Src

<!-- directory-responsibility -->
Implements the link package behavior. Applies JSON mappings as symbolic links or materialized copies and verifies the configured mappings.

Key files: `index.ts`.

```mermaid
flowchart LR
    A["Link mappings"] --> B["Create links or copies"]
    B --> C["Configured filesystem layout"]
```
