# @anoblet/copilot-cli Specification

## Purpose

Provide a thin automation wrapper around `copilot` for repeated prompt execution.

## Runtime

- Node.js ESM
- Invoked via `copilot-cli` (bin) or `node src/index.ts`

## Command Contract

```bash
copilot-cli -p <prompt-file> [options]
```

Options:

- `-p, --prompt <string>`: Required path to prompt file
- `-i, --iterations <number>`: Positive integer, default `3`
- `-a, --agent <string>`: Agent override
- `-m, --model <string>`: Model override

Environment fallback:

- Agent: `COPILOT_CLI_AGENT`
- Model: `COPILOT_CLI_MODEL`

Priority:

1. CLI option
2. Environment variable

## Execution Behavior

- Reads prompt file once.
- Runs `copilot` in a loop with:
  - `--add-dir .`
  - `--allow-all-tools`
  - optional `--agent`
  - optional `--model`
  - `-p <prompt-content>`
- Stops immediately when an iteration fails.
