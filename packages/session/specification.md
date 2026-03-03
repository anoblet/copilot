# session utility specification

## Purpose

Purge old Copilot session directories from disk.

## Input/Command

```bash
node src/index.ts purge [-i <iterations>] [-y|--yes]
```

## Resolution Rules

- Session directory root:
  - `process.env.COPILOT_SESSION_DATA`, else
  - `path.join(process.cwd(), '.copilot/sessions')`

## Purge Rules

- Collect only directories in the session root.
- Sort by `mtime` ascending (oldest first).
- Deletion target:
  - no `iterations`: all directories
  - `iterations = n`: first `n` directories via `slice(0, n)`
- Confirmation prompt is required unless `-y` or `--yes` is supplied.
