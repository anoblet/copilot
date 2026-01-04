# @anoblet/copilot-session

Manages Copilot sessions.

## Commands

### Purge

The `purge` command is used to delete session directories.

#### Usage

```bash
node copilot/packages/session/src/index.ts purge [-i <iterations>]
```

#### Options

- `-i, --iterations <number>`: The number of sessions to delete, starting from the most recent. If not specified, **ALL** sessions will be deleted.

#### Examples

Delete all sessions:

```bash
node copilot/packages/session/src/index.ts purge
```

Delete the most recent session:

```bash
node copilot/packages/session/src/index.ts purge -i 1
```

Delete the 5 most recent sessions:

```bash
node copilot/packages/session/src/index.ts purge --iterations 5
```
