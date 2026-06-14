---
name: plaid
description: Use the @anoblet/copilot-plaid CLI to retrieve financial transactions and account data from the Plaid API, supporting sandbox and production environments with JSON or text output.
---

# Plaid

Use this skill when the task involves retrieving financial data — transactions, account information, or other Plaid API resources — from the `@anoblet/copilot-plaid` CLI tool.

## Good Fit

- Listing recent transactions for a linked Plaid item in JSON or human-readable text.
- Switching between Plaid sandbox (testing) and production environments.
- Debugging Plaid API errors by inspecting raw responses.

## Setup

### Credentials (from Plaid Dashboard)

| Variable                  | Required                  | Description                       |
| ------------------------- | ------------------------- | --------------------------------- |
| `PLAID_CLIENT_ID`         | Yes                       | Plaid API client ID               |
| `PLAID_SANDBOX_SECRET`    | For sandbox               | Secret for sandbox environment    |
| `PLAID_PRODUCTION_SECRET` | For production            | Secret for production environment |
| `PLAID_ACCESS_TOKEN`      | No (use `--access-token`) | Access token for a Plaid item     |

### Quick Start (Sandbox)

Access tokens are **not** in the Plaid Dashboard — they come from the Plaid Link
flow when a user connects their bank. For sandbox testing, generate one directly:

```bash
node --env-file .env packages/plaid/src/index.ts sandbox token
```

This creates a sandbox test account (Chase) and outputs a ready-to-use access
token with the `transactions` product enabled.

### Running the Tool

The tool is a Node.js ESM script located at:

```bash
node packages/plaid/src/index.ts [options] <command> [subcommand]
```

## Usage Patterns

### List Transactions (JSON — Default)

```bash
node packages/plaid/src/index.ts transactions list
```

Outputs a JSON object with `transactions` array and `total_transactions` count.

### List Transactions (Text Format)

```bash
node packages/plaid/src/index.ts transactions list --format text
```

Human-readable table with columns: date, amount, merchant name, and category.

### Custom Date Range

```bash
# Last 7 days
node packages/plaid/src/index.ts transactions list --since -7d

# Specific range
node packages/plaid/src/index.ts transactions list --since 2026-01-01 --until 2026-03-31
```

### Production Environment

```bash
node packages/plaid/src/index.ts --env production transactions list
```

### Override Access Token

```bash
node packages/plaid/src/index.ts transactions list --access-token access-sandbox-xxxxx
```

### Generate Sandbox Token

```bash
node --env-file .env packages/plaid/src/index.ts sandbox token
```

Creates a sandbox access token using Chase test data. To use a different bank:

```bash
node --env-file .env packages/plaid/src/index.ts sandbox token --institution ins_109509
```

### Link a Real Bank Account (including Production)

For production (or any environment), use the interactive Plaid Link flow:

```bash
node --env-file .env packages/plaid/src/index.ts link
```

This starts a local web server, opens your browser, and walks you through
connecting a real bank account through Plaid's UI. After you authenticate,
the CLI prints a long-lived `PLAID_ACCESS_TOKEN` you can save to `.env`.

Works for any `--env` (sandbox, development, production):

## Concepts: Why no access token in the dashboard?

- **Client ID + Secret** — authenticate _your app_ to Plaid. These are in the dashboard.
- **Access token** — authenticates a _specific user's bank connection_. Generated at runtime
  via Plaid Link (frontend flow) or the `sandbox token` command (testing only).
- **Public key** — a legacy/deprecated concept from older Plaid SDKs. Not needed in this tool.

## Guardrails

- `PLAID_CLIENT_ID` is always required regardless of environment.
- The correct secret variable (`PLAID_SANDBOX_SECRET` or `PLAID_PRODUCTION_SECRET`) must be set for the target environment.
- The access token must correspond to a Plaid item whose products include `transactions`.
- Sandbox tokens do not carry over to production. Generate separate access tokens per environment.
- Plaid API errors include a `status` code and structured `response.data` — the CLI prints these to stderr for debugging.

## Troubleshooting

### Error: PLAID_CLIENT_ID environment variable is required

**Cause**: `PLAID_CLIENT_ID` is not set in the environment.
**Fix**: Export the variable or add it to your shell profile / `.env` file.

### Error: PLAID_SANDBOX_SECRET / PLAID_PRODUCTION_SECRET is required

**Cause**: The correct secret for the selected environment (`--env`) is missing.
**Fix**: Set the matching environment variable.

### Error: Access token is required

**Cause**: Neither `--access-token` nor `PLAID_ACCESS_TOKEN` was provided.
**Fix**: Provide the access token via CLI option or environment variable.

### Plaid API error (4xx/5xx)

**Cause**: The Plaid API returned an error — invalid token, expired token, product not enabled, etc.
**Fix**: Inspect the JSON error output to determine the specific Plaid error code and message. Common codes include `ITEM_LOGIN_REQUIRED` (login needed), `PRODUCT_NOT_ENABLED` (item missing the transactions product), and `INVALID_ACCESS_TOKEN` (token is wrong or expired).
