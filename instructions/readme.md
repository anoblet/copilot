# Instructions

The instruction index identifies the absent Astro guide explicitly. GitHub instruction navigation uses the maintained test guide under `instructions/` instead of promising a missing copy.

<!-- directory-responsibility -->
Stores development conventions and tool-specific assistant instructions.

Key files: `chrome-devtools.instructions.md`, `copilot.instructions.md`, `css.instructions.md`, `git-flow.instructions.md`, `git.instructions.md`, `index.instructions.md`, `inspiration.instructions.md`, `node.instructions.md`, `principles.instructions.md`, `prompt.instructions.md`.

```mermaid
flowchart LR
    NAV10["Maintained test guide and explicit absent Astro guide"] --> NAV10OUT["Verified navigation and explicit source availability"]
    A["Development activity"] --> B["Apply matching instruction file"]
    B --> C["Consistent implementation workflow"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
