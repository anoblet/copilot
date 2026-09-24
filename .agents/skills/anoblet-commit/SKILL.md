---
name: anoblet-commit
description: Commit and push reviewed changes across a repository and its initialized submodules using AI-generated Conventional Commit messages.
---

# Commit and Publish

Five steps per repository, deepest submodule first and root last. A direct request
authorizes committing and pushing reviewed changes; editing this skill does not. Honor
narrower scope and preserve all other changes.

## 1. Identify submodules

Read applicable repository instructions. Discover submodules recursively from NUL-delimited
index entries and skip uninitialized ones. Review the intended changes, hooks, remotes, and
duplicate worktrees, and verify each configured remote and upstream, fetching before
committing. Keep initialized submodules on local `main` tracking the verified remote's
`main`; preserve the root branch.

## 2. Stage

Stage nonignored changes and inspect the staged diff. Exclude ignored files; never discard
user data or hide changes. Update affected directory documentation and run the relevant
checks, validating databases only through their documented read-only tools. The helper stages
the entire repository, so when a scheduled task or another session has left unrelated changes
in the same repository, decide first whether this turn may publish them and commit only your
own paths with an explicit pathspec when it may not.

## 3. Generate the commit message

Write one Conventional Commit message per changed repository from its reviewed changes,
formatted `type(scope): description`; see
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

## 4. Commit

Commit the staged changes with that message. Never initialize submodules, change branches,
resolve divergence, or bypass hooks. Test the helper only in a disposable repository,
because it commits and pushes.

## 5. Push

Push to the configured upstream and verify publication, then recheck each repository's
branch/upstream, parent gitlink, published `HEAD`, and full status.

Run the TypeScript helper for each repository, deepest submodule first and root last:

```bash
node .agents/skills/anoblet-commit/commit.ts --repo <repository-path> --message "<AI-generated message>"
```

The helper stages nonignored changes, checks the staged diff, commits with the supplied
message, pushes to the configured upstream, and verifies publication. It never generates
messages, initializes submodules, changes branches, resolves divergence, or bypasses hooks.

## Boundaries

- Stop on missing or ambiguous destinations, divergence, conflicts, or auth failures;
  diagnose before continuing and never retry an unchanged failure.
- Never guess remotes, discard history, or force-push; serialize checkouts sharing a remote
  branch.
- Report commit IDs, clean/published state, skipped submodules, and blockers accurately, and
  never claim success if any required commit, push, or verification failed.
