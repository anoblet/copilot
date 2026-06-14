#!/usr/bin/env node
import { Command } from "commander";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const program = new Command();

program
  .name("copilot-plaid")
  .description("Plaid API CLI tool for retrieving and managing financial data")
  .option(
    "--env <environment>",
    "Plaid environment (sandbox or production)",
    "sandbox",
  )
  .addHelpText(
    "after",
    `
Environment Variables:
  PLAID_CLIENT_ID           Required. Plaid API client ID.
  PLAID_SANDBOX_SECRET      Required for sandbox environment.
  PLAID_PRODUCTION_SECRET   Required for production environment.
  PLAID_ACCESS_TOKEN        Default access token for Plaid item.
  `,
  );

/**
 * Parse a relative date string like "-30d" into an absolute ISO date string.
 * Falls back to the raw string if it does not match the relative pattern.
 */
function parseDate(dateStr: string): string {
  const relativeMatch = /^-(\d+)d$/.exec(dateStr);
  if (relativeMatch) {
    const daysAgo = parseInt(relativeMatch[1], 10);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
  }
  // Assume it is already an ISO-like date string
  return dateStr;
}

/**
 * Build a configured PlaidApi client based on the environment option.
 */
function createPlaidClient(env: string): PlaidApi {
  const clientId = process.env.PLAID_CLIENT_ID;
  if (!clientId) {
    console.error("Error: PLAID_CLIENT_ID environment variable is required.");
    process.exit(1);
  }

  let secret: string | undefined;
  let basePath: string;

  if (env === "production") {
    secret = process.env.PLAID_PRODUCTION_SECRET;
    basePath = PlaidEnvironments.production as string;
  } else {
    secret = process.env.PLAID_SANDBOX_SECRET;
    basePath = PlaidEnvironments.sandbox as string;
  }

  if (!secret) {
    const varName =
      env === "production" ? "PLAID_PRODUCTION_SECRET" : "PLAID_SANDBOX_SECRET";
    console.error(
      `Error: ${varName} environment variable is required for ${env} environment.`,
    );
    process.exit(1);
  }

  const configuration = new Configuration({
    basePath,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });

  return new PlaidApi(configuration);
}

/**
 * Resolve the access token from CLI option or environment variable.
 */
function resolveAccessToken(cliToken?: string): string {
  const token = cliToken || process.env.PLAID_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "Error: Access token is required. Provide via --access-token or PLAID_ACCESS_TOKEN environment variable.",
    );
    process.exit(1);
  }
  return token;
}

// ── transactions list ─────────────────────────────────────────────────────

const transactionsCommand = program
  .command("transactions")
  .description("Retrieve transaction data");

transactionsCommand
  .command("list")
  .description("List transactions for a Plaid item")
  .option("-t, --access-token <token>", "Plaid access token")
  .option(
    "-s, --since <date>",
    "Start date (ISO 8601 or relative like -30d)",
    "-30d",
  )
  .option("-u, --until <date>", "End date (ISO 8601)")
  .option("-f, --format <format>", "Output format: json or text", "json")
  .option("--count <number>", "Number of transactions to return", "10")
  .option("--offset <number>", "Offset for pagination", "0")
  .action(async (options) => {
    const env = program.opts().env;
    const plaidClient = createPlaidClient(env);
    const accessToken = resolveAccessToken(options.accessToken);

    const sinceDate = parseDate(options.since);
    const untilDate = options.until || new Date().toISOString().split("T")[0];
    const count = parseInt(options.count, 10);
    const offset = parseInt(options.offset, 10);

    try {
      const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: sinceDate,
        end_date: untilDate,
        options: {
          count,
          offset,
        },
      });

      const { transactions, total_transactions } = response.data;

      if (options.format === "text") {
        if (transactions.length === 0) {
          console.log("No transactions found.");
          return;
        }
        console.log(`Total transactions: ${total_transactions}`);
        console.log(`Showing ${transactions.length} transaction(s):\n`);
        for (const txn of transactions) {
          const date = txn.date ?? "unknown";
          const name = txn.name ?? "unknown";
          const amount =
            txn.amount != null ? `$${txn.amount.toFixed(2)}` : "$0.00";
          const category =
            txn.personal_finance_category?.primary ?? txn.category?.[0] ?? "";
          console.log(
            `${date}  ${amount.padStart(8)}  ${name}${category ? `  [${category}]` : ""}`,
          );
        }
      } else {
        // Default: JSON output
        console.log(
          JSON.stringify({ transactions, total_transactions }, null, 2),
        );
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const plaidError = error as {
          response: { data: unknown; status: number };
        };
        console.error(`Plaid API error (${plaidError.response.status}):`);
        console.error(JSON.stringify(plaidError.response.data, null, 2));
      } else {
        console.error("Error fetching transactions:", error);
      }
      process.exit(1);
    }
  });

// ── Parse and run ─────────────────────────────────────────────────────────

program.parse(process.argv);
