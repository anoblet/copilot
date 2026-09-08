# References

<!-- directory-responsibility -->
Supplies supporting guidance for Debugmcp, covering troubleshooting, workflow.

Key files: `troubleshooting.md`, `workflow.md`.

```mermaid
flowchart LR
    A["Capability-specific question"] --> B["Consult Debugmcp references"]
    B --> C["Applicable procedure and constraints"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
