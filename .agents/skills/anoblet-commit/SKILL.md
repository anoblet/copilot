---
name: anoblet-commit
description: Review, commit, and push all changes in a repository and its initialized submodules recursively, then verify published commits and clean working trees. Use when Andrew asks to commit and push the repository tree or invokes this workflow.
---

# Commit and publish a repository tree

Finish with reviewed changes committed and pushed, parent gitlinks pointing to published child commits, and clean working trees in the root and every initialized submodule.

## Scope and authorization

- An invocation to perform this workflow authorizes commits and pushes of all reviewed changes in the selected repository tree to its configured remotes. Do not ask again for an already authorized commit or push. Creating or editing this skill alone does not invoke it.
- Honor narrower user constraints. Include pre-existing staged, unstaged, and nonignored untracked changes when the request says all changes; preserve their content and use separate commits when their purpose warrants it.
- Ignored files are outside the default scope. Do not force-add secrets, local configuration, dependencies, or generated artifacts to make the tree appear complete. Keep private content within its authorized repository destination.
- Do not discard changes, delete local data, hide dirt with index flags, force-push, or rewrite published history to achieve a clean status. A clean tree is a verification result, not permission for destructive cleanup.

## Inventory and review

1. Resolve the requested root and read applicable repository instructions. Discover initialized submodules recursively from index entries with mode `160000`, using NUL-aware parsing (`git ls-files --stage -z`). Do not rely solely on `git submodule foreach` or `git submodule status`: missing `.gitmodules` mappings can make them omit repositories or fail.
2. Record each repository's HEAD, branch, upstream, fetch and push URLs, staged and unstaged changes, and nonignored untracked files. Distinguish uninitialized gitlinks from initialized repositories. Report uninitialized submodules as skipped; do not initialize them unless requested or necessary for an explicitly broader task.
3. Inspect effective commit/push hooks, including `core.hooksPath`, before staging or making path-limited commits. A hook that runs `git add -A` can expand a commit even with `git commit --only`. Account for its behavior; inspect the resulting commit and index afterward. Do not silently disable hooks.
4. Review actual diffs and new file contents for correctness, unintended deletions, sensitive additions, and generated files. Summarize private changes without reproducing private records. Use meaningful commit groups and messages; do not label unrelated record changes as code fixes.
5. Apply [directory documentation](../anoblet-directory-docs/SKILL.md) to affected directories and staged gitlink parents. Maintain each directory's immediate-entry `.gitignore` allowlist for intended additions. Then verify the addition is actually tracked: a deny-by-default allowlist makes an intended new file silently invisible, so a commit can succeed while omitting it. Check each intended new path with `git check-ignore -v <path>` (expect no output) and `git ls-files --error-unmatch <path>` (expect the path); a silent `git status` absence is not evidence that it was staged. Run relevant checks for the actual changes and `git diff --check`; documentation/ignore-only changes need tracking checks, not unrelated application tests.
6. Ignore rules do not untrack existing files. If authorized cleanup requires removing generated artifacts from tracking, review the exact paths and use `git rm --cached` so local files survive; verify they remain present and ignored. Otherwise preserve the existing tracking and report any unresolved changes. Never open or edit managed database internals as part of Git cleanup.

## Plan publication

- Fetch configured destinations and compare local history with the target branch. Detect multiple checkouts targeting the same remote and branch before pushing; serialize their publications.
- Keep every initialized submodule checked out on local `main`, tracking its configured remote's `main`. Preserve detached or side-branch commits with a recoverable reference, then fast-forward or merge them into `main` together with remote updates. Do not reset branches or discard either history. Preserve the root's existing branch unless instructed otherwise.
- When multiple checkouts share a remote, reconcile their commits into the same `main` history and synchronize each checkout before recording parent gitlinks. Resolve conflicts from evidence and rerun affected checks. Do not substitute a published side branch for the requested final `main` checkout or force-push to resolve a rejection.
- Set `branch = main` in each initialized submodule's parent `.gitmodules` entry and verify the local upstream. This selects the branch for `git submodule update --remote`; it does not automatically pull updates or prevent ordinary submodule updates from detaching HEAD. Recheck actual checkout branches at completion.
- Repair missing submodule mappings only from verified configuration or repository evidence. Do not guess URLs. If HTTPS authentication fails and SSH works for the same verified repository, use that supported route and report any persistent remote/configuration change.
- If a destination is missing, ambiguous, or unauthorized, finish independent review and local preparation, then request only the missing decision. Stop the affected publication on unresolved conflicts, failing required checks, or authentication failure after diagnosis; continue independent repositories where useful.

## Commit and push from children to parents

1. Process deepest initialized submodules first. Stage the reviewed change set, including intended additions and deletions; inspect the staged diff and run `git diff --cached --check` before committing. Preserve partial staging when the user constrained scope.
2. Commit coherent changes and inspect hook output, the actual commit contents, and remaining status. Include or review hook-generated edits before proceeding. If no changes require a commit, still check for unpublished commits.
3. Push to the verified destination. Confirm the remote branch contains the exact local commit; if the remote advanced, verify ancestry rather than assuming equality. On rejection, fetch and diagnose before choosing a non-destructive integration into `main`. Do not repeat the same failing push unchanged.
4. Only after child commits are published, stage their gitlinks in the parent together with its reviewed changes, then commit and push that parent. Repeat until the root is published. Do not publish a parent pointing at a child commit that is unavailable from the child's configured remote.

## Verify and report

- Re-enumerate the repository tree. For every initialized repository, check staged, unstaged, and nonignored untracked status; do not use `--ignore-submodules` for the final clean-tree claim.
- Verify each initialized submodule is on local `main` with the correct upstream, each initialized gitlink matches the child's actual HEAD, and each published HEAD is reachable from the reported remote branch. Verify any artifacts removed only from tracking still exist locally and are ignored.
- If another process creates new edits during the run, review and publish them within the authorized scope when practical. If changes keep arriving, report that live activity prevents a stable clean result; do not stop services or hide changes merely to pass verification.
- Report the root commit, whether all initialized submodules are on `main`, whether all initialized repositories are clean and published, and any skipped repositories or blockers. Never claim completion if a push failed, a required check failed, a parent points to an unpublished child, or a working tree remains dirty.
