# session utility

Utility script for purging Copilot session directories.

## Location

- Script: `copilot/packages/session/src/index.ts`

## Usage

```bash
node /homeassistant/copilot/packages/session/src/index.ts purge
node /homeassistant/copilot/packages/session/src/index.ts purge -i 5
node /homeassistant/copilot/packages/session/src/index.ts purge -i 5 --yes
```

## Options

- `-i, --iterations <number>`: Number of directories to purge from the oldest forward
- `-y, --yes`: Skip interactive confirmation

## Behavior

- Session root is resolved from:
  - `COPILOT_SESSION_DATA`, or
  - `<cwd>/.copilot/sessions`
- Session directories are sorted by modification time (oldest first).
- If `--iterations` is omitted, all discovered directories are purged.
- If `--iterations 0` is passed, no directories are purged.
