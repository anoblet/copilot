# Link

<!-- directory-responsibility -->
Applies JSON mappings as symbolic links or materialized copies and verifies the configured mappings.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `link.json`, `package.json`, `specification.md`.

```mermaid
flowchart LR
    A["Link mappings"] --> B["Create links or copies"]
    B --> C["Configured filesystem layout"]
```
