#!/usr/bin/env node
import { Command } from "commander";
import { exec } from "node:child_process";
import http from "node:http";
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

// ── sandbox token create ──────────────────────────────────────────────────

const sandboxCommand = program
  .command("sandbox")
  .description("Sandbox-only commands for testing");

sandboxCommand
  .command("token")
  .description("Generate a sandbox access token for testing")
  .option(
    "-i, --institution <id>",
    "Sandbox institution ID (e.g. ins_109508 for Chase)",
    "ins_109508",
  )
  .option(
    "-p, --products <items>",
    "Comma-separated products (e.g. transactions,auth)",
    "transactions",
  )
  .action(async (options) => {
    const plaidClient = createPlaidClient("sandbox");
    const initialProducts = options.products
      .split(",")
      .map((p: string) => p.trim());

    try {
      // Step 1: Create a sandbox public token
      const publicTokenResponse = await plaidClient.sandboxPublicTokenCreate({
        institution_id: options.institution,
        initial_products: initialProducts,
      });
      const publicToken = publicTokenResponse.data.public_token;
      console.log("✓ Sandbox public token created.");

      // Step 2: Exchange it for a long-lived access token
      const exchangeResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      const accessToken = exchangeResponse.data.access_token;
      const itemId = exchangeResponse.data.item_id;

      console.log(`\nAccess token: ${accessToken}`);
      console.log(`Item ID:      ${itemId}`);
      console.log(
        `\nTry it: node packages/plaid/src/index.ts transactions list --access-token ${accessToken} --format text`,
      );
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const plaidError = error as {
          response: { data: unknown; status: number };
        };
        console.error(`Plaid API error (${plaidError.response.status}):`);
        console.error(JSON.stringify(plaidError.response.data, null, 2));
      } else {
        console.error("Error creating sandbox token:", error);
      }
      process.exit(1);
    }
  });

// ── link ───────────────────────────────────────────────────────────────────

program
  .command("link")
  .description(
    "Link a bank account via Plaid Link in your browser (works for any environment)",
  )
  .option("-p, --port <number>", "Local web server port", "8080")
  .option(
    "--products <items>",
    "Comma-separated products (e.g. transactions,auth)",
    "transactions",
  )
  .option("--country <code>", "Country code", "US")
  .option("--language <code>", "Language code", "en")
  .action(async (options) => {
    const env = program.opts().env;
    const plaidClient = createPlaidClient(env);
    const port = parseInt(options.port, 10);
    const products = options.products.split(",").map((p: string) => p.trim());

    try {
      // Step 1: Create a link token
      const linkTokenResponse = await plaidClient.linkTokenCreate({
        user: { client_user_id: "copilot-plaid" },
        client_name: "Copilot Plaid",
        products,
        country_codes: [options.country],
        language: options.language,
      });
      const linkToken = linkTokenResponse.data.link_token;

      // Step 2: Start local HTTP server with Plaid Link, exchange on callback
      const result = await new Promise<{ accessToken: string; itemId: string }>(
        (resolve, reject) => {
          const server = http.createServer((req, res) => {
            if (req.method === "GET" && req.url === "/") {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Link Bank Account</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f7fa; }
    .card { background: #fff; border-radius: 12px; padding: 48px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08); max-width: 420px; }
    h1 { font-size: 1.5rem; margin: 0 0 8px; color: #1a1a2e; }
    p { color: #555; margin: 0 0 24px; }
    button { background: #1a1a2e; color: #fff; border: none; padding: 12px 32px; border-radius: 8px; font-size: 1rem; cursor: pointer; }
    button:hover { background: #16213e; }
    .success { display: none; }
    .success h2 { color: #0a7; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Link Your Bank Account</h1>
    <p>Click below to securely connect your bank through Plaid.</p>
    <button id="link-btn">Link Account</button>
    <div class="success">
      <h2>✓ Account linked successfully!</h2>
      <p>You can close this window.</p>
    </div>
  </div>
  <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
  <script>
    const handler = Plaid.create({
      token: '${linkToken}',
      onSuccess: (public_token, metadata) => {
        fetch('/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        });
        document.querySelector('.success').style.display = 'block';
        document.getElementById('link-btn').style.display = 'none';
      },
      onExit: (err) => {
        if (err && err.error_code !== 'INVALID_LINK_TOKEN') {
          fetch('/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err.error_message || 'User exited' }),
          });
        }
      },
    });
    document.getElementById('link-btn').onclick = () => handler.open();
    handler.open();
  </script>
</body>
</html>`);
            } else if (req.method === "POST" && req.url === "/callback") {
              let body = "";
              req.on("data", (chunk) => (body += chunk));
              req.on("end", async () => {
                try {
                  const data = JSON.parse(body);
                  if (data.error) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ status: "error" }));
                    reject(new Error(data.error));
                    return;
                  }
                  const exchange = await plaidClient.itemPublicTokenExchange({
                    public_token: data.public_token,
                  });
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ status: "ok" }));
                  server.close();
                  resolve({
                    accessToken: exchange.data.access_token,
                    itemId: exchange.data.item_id,
                  });
                } catch (err) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "Exchange failed" }));
                  reject(err);
                }
              });
            } else {
              res.writeHead(404);
              res.end();
            }
          });

          server.listen(port, () => {
            const url = `http://localhost:${port}`;
            console.log(`\nStarting Plaid Link on http://localhost:${port}`);
            exec(
              `xdg-open "${url}" 2>/dev/null || open "${url}" 2>/dev/null || true`,
              () => {},
            );
          });
        },
      );

      console.log(`\n✓ Account linked successfully!`);
      console.log(`Access token: ${result.accessToken}`);
      console.log(`Item ID:      ${result.itemId}`);
      console.log(`\nAdd this to your .env file:`);
      console.log(`PLAID_ACCESS_TOKEN=${result.accessToken}`);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const plaidError = error as {
          response: { data: unknown; status: number };
        };
        console.error(`Plaid API error (${plaidError.response.status}):`);
        console.error(JSON.stringify(plaidError.response.data, null, 2));
      } else {
        console.error("Error linking account:", error);
      }
      process.exit(1);
    }
  });

// ── Parse and run ─────────────────────────────────────────────────────────

program.parse(process.argv);
