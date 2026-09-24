---
name: anoblet-commit
description: Commit and push reviewed changes across a repository and its initialized submodules using AI-generated Conventional Commit messages.
---

# Commit and Publish

Commit and push reviewed changes across a repository and its initialized submodules. A direct request authorizes publication; editing this skill does not.

## Boundaries

- A direct request authorizes committing and pushing reviewed changes; editing this skill does not. Honor narrower scope and preserve all other changes.
- Exclude ignored files. Never discard user data, hide changes, force-push, or rewrite published history.

## Review

- Read applicable repository instructions. Discover submodules recursively from NUL-delimited index entries; skip uninitialized ones.
- Review all intended changes, hooks, remotes, and duplicate worktrees. Update affected directory documentation and run relevant checks. Validate databases only through their documented read-only tools. Test the helper only in a disposable repository because it commits and pushes.

## Synchronize

- Verify each configured remote and upstream; fetch before committing. Keep initialized submodules on local `main` tracking the verified remote's `main`; preserve the root branch.
- Stop on missing or ambiguous destinations, divergence, conflicts, or auth failures. Never guess remotes, discard history, or force-push. Serialize checkouts sharing a remote branch.

## Commit and Push

Generate one Conventional Commit message per changed repository from its reviewed changes. Then run the TypeScript helper for each repository, deepest submodule first and root last:

```bash
node .agents/skills/anoblet-commit/commit.ts --repo <repository-path> --message "<AI-generated message>"
```

The helper stages nonignored changes, checks the staged diff, commits with the supplied message, pushes to the configured upstream, and verifies publication. It never generates messages, initializes submodules, changes branches, resolves divergence, or bypasses hooks. Its header format is `type(scope): description`; see [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

Stop on any helper failure. Diagnose before continuing; never retry an unchanged failure.

## Verify

Recheck every repository's branch/upstream, parent gitlink, published `HEAD`, and full status. Report commit IDs, clean/published state, skipped submodules, and blockers accurately. Never claim success if any required commit, push, or verification failed.
