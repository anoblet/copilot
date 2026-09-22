# Anoblet skill workshop

<!-- directory-responsibility -->

Provides the Skill Workshop lifecycle skill. Handle `/learn` and learning-from-recent-work requests, and stage, apply, revise, reject, quarantine, or retire a Workshop skill proposal without corrupting a live skill.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["/learn or skill-proposal request"] --> B["Read live workshop CLI state"]
    B --> C["Proposal lifecycle verbs"]
    C --> D["Pending: revise, apply, reject, quarantine"]
    C --> E["Applied: content is live, no retire verb"]
    C --> F["Stale: blocked until restored to pending"]
    E --> G["Retire recoverably via archive move"]
    G --> H["Verify with skills list --json"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only.
