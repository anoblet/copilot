# Cli

<!-- directory-responsibility -->
Wraps the Copilot command to repeat file-based prompts for a configured number of iterations.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `package.json`, `specification.md`, `tsconfig.json`.

```mermaid
flowchart LR
    A["Prompt file and iteration count"] --> B["Invoke Copilot repeatedly"]
    B --> C["Completed prompt iterations"]
```
