# @anoblet/copilot-cli

A wrapper around copilot-cli to run multiple iterations.

## Features

- [x] Runs `copilot` command multiple times (iterations)
- [x] Accepts a prompt file path
- [x] Allows specifying an agent and model via CLI options or environment variables
- [x] Passes `--add-dir .` and `--allow-all-tools` to the underlying `copilot` command

## Usage

```bash
# Run with default settings (1 iteration)
copilot-cli -p path/to/prompt.md

# Run with specific agent and model
copilot-cli -p path/to/prompt.md -a my-agent -m gpt-4

# Run with custom number of iterations
copilot-cli -p path/to/prompt.md -i 5
```

### Options

- `-i, --iterations <number>`: Number of iterations to run (default: 3)
- `-p, --prompt <string>`: Path to the prompt file (required)
- `-a, --agent <string>`: Agent to use
- `-m, --model <string>`: Model to use

### Environment Variables

- `COPILOT_CLI_AGENT`: Default agent to use
- `COPILOT_CLI_MODEL`: Default model to use
