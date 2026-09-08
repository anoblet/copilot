# Mermaid

<!-- directory-responsibility -->
Provides the Mermaid skill. Use Mermaid to create text-based diagrams such as flowcharts, sequence diagrams, state machines, ER diagrams, timelines, and architecture views when a task needs a lightweight visual model in Markdown or source control.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Mermaid"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
