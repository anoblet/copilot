# References

<!-- directory-responsibility -->
Supplies supporting guidance for Openscad, covering bosl2 reference map, modeling from images, validation and iteration, workflows.

Key files: `bosl2-reference-map.md`, `modeling-from-images.md`, `validation-and-iteration.md`, `workflows.md`.

```mermaid
flowchart LR
    A["Capability-specific question"] --> B["Consult Openscad references"]
    B --> C["Applicable procedure and constraints"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
