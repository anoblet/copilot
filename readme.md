# Copilot

<!-- directory-responsibility -->
Supplies shared Copilot instructions, agents, prompts, skills, and supporting command-line utilities.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `package.json`, `pnpm-workspace.yaml`, `specification.md`.

```mermaid
flowchart LR
    A["Development task"] --> B["Apply Copilot framework capabilities"]
    B --> C["Configured assistant workflow"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.

The main branch integrates the shared capability updates and directory allowlists. The responsibility description and diagram remain unchanged.
