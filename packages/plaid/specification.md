# @anoblet/copilot-plaid Specification

## Purpose

CLI tool for interacting with the Plaid API to retrieve financial data such as transactions.

## Environment Variables

| Variable                  | Required    | Description                       |
| ------------------------- | ----------- | --------------------------------- |
| `PLAID_CLIENT_ID`         | Yes         | Plaid API client ID               |
| `PLAID_SANDBOX_SECRET`    | Conditional | Secret for sandbox environment    |
| `PLAID_PRODUCTION_SECRET` | Conditional | Secret for production environment |
| `PLAID_ACCESS_TOKEN`      | No          | Access token for a Plaid item     |

## Command Contract

```bash
node src/index.ts [global options] <command> [subcommand] [options]
```

### Global Options

- `--env <environment>`: Plaid environment (`sandbox` or `production`). Default: `sandbox`.

### Commands

#### `transactions list`

List transactions for a Plaid item.

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

#### `sandbox token`

Generate a sandbox access token for testing (bypasses the Plaid Link frontend).

```bash
node src/index.ts sandbox token [options]
```

Options:

- `-i, --institution <id>`: Sandbox institution ID. Default: `ins_109508` (Chase).
- `-p, --products <items>`: Comma-separated products. Default: `transactions`.

#### `link`

Open a browser-based Plaid Link flow to connect a real bank account. Works in any
environment (sandbox, development, production) — the `--env` global option selects
which.

```bash
node src/index.ts link [options]
```

Options:

- `-p, --port <number>`: Local web server port. Default: `8080`.
- `--products <items>`: Comma-separated products to request. Default: `transactions`.
- `--country <code>`: ISO country code. Default: `US`.
- `--language <code>`: Language code. Default: `en`.

The flow:

1. Creates a Plaid Link token.
2. Starts a local HTTP server and opens your browser.
3. You authenticate with your bank through Plaid's UI.
4. Plaid returns a `public_token` via JavaScript callback.
5. The server exchanges it for a long-lived `access_token`.
6. Prints the token and suggests a `.env` line to save it.

Use this for production — `sandbox token` is faster for sandbox-only testing.
