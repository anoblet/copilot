# Copilot

<!-- directory-responsibility -->

Supplies shared Copilot instructions, prompts, skills, shared agents, and supporting command-line utilities. The workspace reaches this repository's `.github/` and `.vscode/` wiring through the root symlinks declared in `link.json`.

Detailed usage and existing reference material: [README.md](README.md).

Key files: `package.json`, `pnpm-workspace.yaml`, `specification.md`.

Andrew requested complete removal of `awesome-copilot` and `genaisrc` on October 12. This repository now has no submodules; mappings, tracking allowlist entries, and leftover checkout directories have been removed. Historical provenance follows. `genaisrc` was retired in commit `93991f0ba6187a151de98c57abf39fcd9f4fd16c` and its gitlink was accidentally restored by `d0f495bb34d81c3992677d75dc13d2445cd7264d` without a mapping. The October 12 repair removes that stale index entry. Its final pinned revision, `21a8d6630688dc9fcf17f6197a7d830dd75713c5`, and verified historical remote, `git@github.com:anoblet/genaisrc.git`, remain recorded here and in Git history; no initialized checkout or source files were removed.

```mermaid
flowchart LR
    A["Workspace or package task"] --> B["Reusable Copilot capabilities"]
    B --> C["instructions/ and prompts/"]
    B --> D["skills/, themes/, and packages/"]
    B --> E[".github/ and .vscode/ wiring"]
    B --> S["Repository-owned capabilities without nested submodules"]
    E --> F["Root symlinks declared in link.json"]
    C --> G["Configured assistant workflow"]
    D --> G
    F --> G
```

The agent skill catalog that lived in `.agents/` moved to the `storage` vault on 2026-09-24, so this repository no longer carries it. The workspace keeps the four entrypoints it exposes as relative symlinks into `storage/.agents/skills/`.

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only.

The main branch integrates the shared capability updates and directory allowlists.
