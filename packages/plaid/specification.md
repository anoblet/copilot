# @anoblet/copilot-plaid Specification

## Purpose

CLI tool for interacting with the Plaid API to retrieve financial data such as transactions.

## Environment Variables

| Variable                  | Required    | Description                         |
| ------------------------- | ----------- | ----------------------------------- |
| `PLAID_CLIENT_ID`         | Yes         | Plaid API client ID                 |
| `PLAID_SANDBOX_SECRET`    | Conditional | Secret for sandbox environment      |
| `PLAID_PRODUCTION_SECRET` | Conditional | Secret for production environment   |
| `PLAID_ACCESS_TOKEN`      | No          | Default access token for Plaid item |

## Command Contract

```bash
node src/index.ts [global options] <command> [subcommand] [options]
```

### Global Options

- `--env <environment>`: Plaid environment (`sandbox` or `production`). Default: `sandbox`.

### Commands

#### `transactions list`

List transactions for a Plied item.

```bash
node src/index.ts transactions list [options]
```

Options:

- `-t, --access-token <token>`: Plaid access token (overrides `PLAID_ACCESS_TOKEN`)
- `-s, --since <date>`: Start date (ISO 8601 or relative like `-30d`). Default: `-30d` (30 days ago).
- `-u, --until <date>`: End date (ISO 8601). Default: today.
- `-f, --format <format>`: Output format (`json`, `text`). Default: `json`.
- `--count <number>`: Number of transactions to return. Default: `10`.
- `--offset <number>`: Offset for pagination. Default: `0`.

## Environment Resolution

1. `--env` CLI option determines which secret to use.
2. Secret is read from `PLAID_SANDBOX_SECRET` or `PLAID_PRODUCTION_SECRET` depending on environment.
3. `PLAID_CLIENT_ID` is always required.

## Access Token Resolution

Priority:

1. `--access-token` CLI option
2. `PLAID_ACCESS_TOKEN` environment variable
3. (Error if neither is provided)

## Output Formats

### `json` (default)

Outputs raw transaction data as a JSON array with pagination metadata.

### `text`

Outputs a human-readable table of transaction summaries.
