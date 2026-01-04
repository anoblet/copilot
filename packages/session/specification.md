- Implement a script(TypeScript) that purges the sessions from `.copilot/sessions/`

## Usage

`/home/andrew/software/resume`

```bash
node copilot/packages/session/src/index.ts purge
```

```bash
node copilot/packages/session/src/index.ts purge -i 1
```

```bash
node copilot/packages/session/src/index.ts purge --iterations 3
```

## Requirements

- Use the `-i` flag for `--iterations`
- `0` should mean all and should be the default
- Sessions should be read from the `COPILOT_SESSION_DATA` environment variable directory if it exists, otherwise default to `.copilot/sessions/`
