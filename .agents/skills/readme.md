# Skills

<!-- directory-responsibility -->

Owns discoverable skill entrypoints for repository tasks. Each child skill defines its own scope and workflow, including the workspace commit workflow at [anoblet-commit](anoblet-commit/readme.md), the OpenClaw model catalog workflow at [anoblet-models-update](anoblet-models-update/readme.md), the runtime incident record at [anoblet-incident-record](anoblet-incident-record/readme.md), and the Skill Workshop lifecycle at [anoblet-skill-workshop](anoblet-skill-workshop/readme.md).

```mermaid
flowchart LR
    A["Task requirements"] --> B["Select a matching skill"]
    B --> C["Task-specific operating instructions"]
    C --> D["Repository commit workflow"]
    D --> E["Identify submodules, stage, generate message, commit, push"]
    C --> F["Model catalog workflow"]
    F --> G["Sync OpenAI and OpenCode entries"]
    C --> H["Runtime incident record"]
    H --> I["Symptom, evidence, recovery, prevention"]
    C --> J["Skill Workshop lifecycle"]
    J --> K["Proposal states and recoverable retirement"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. The `anoblet-commit`, `anoblet-models-update`, `anoblet-incident-record`, and `anoblet-skill-workshop` child allowlists track their `SKILL.md` and overview; the workspace exposes those tracked sources through relative symlinks. This repository applies the workspace policy independently; its root rules cover root entries only.
