# Anoblet models update

<!-- directory-responsibility -->
Provides the Anoblet models update skill. Update an OpenClaw configuration's available model catalog from the OpenClaw CLI, using Codex OAuth for OpenAI and preserving fallback settings.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Anoblet models update"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
