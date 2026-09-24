# Repository commits

Owns the workflow for publishing changes across a repository and its initialized submodules. [SKILL.md](SKILL.md) defines the five steps — identify submodules, stage, generate the commit message, commit, push — run deepest submodule first and root last. [commit.ts](commit.ts) deterministically stages nonignored changes, validates, commits with the AI-generated Conventional Commit message, pushes, and verifies the configured upstream. Test the helper only in a disposable repository.

```mermaid
flowchart LR
    A[Identify submodules<br/>and verify remotes] --> B[Stage nonignored changes]
    B --> C[AI generates Conventional Commit message]
    C --> D[Commit the staged changes]
    D --> E[Push and verify the configured upstream]
    E --> F[Run children before parents; verify gitlinks and clean trees]
```
