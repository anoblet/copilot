- A wrapper around [copilot-cli](https://github.com/github/copilot-cli)

## Arguments

```
  -i, --iterations <number>    Number of iterations to run (default: 3)
  -p, --prompt <string>        Path to the prompt file
  -h, --help                   display help for command
```

## Usage

```bash
node packages/copilot/cli/src/index.ts -i 5 -p prompt.md
```

```bash
copilot --add-dir . --allow-all-tools --model gpt-5-mini -p [PROMPT]
```

## Environment Variables

- `COPILOT_CLI_MODEL`: Specify the model to use (overrides `--model` flag)
