import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import {
  HUMAN_EVENT_USER_INPUT,
  HUMAN_ROUTES,
  HumanPromptSchema,
} from "../shared/humanProtocol.ts";

/**
 * Terminal client for `@copilot/mcp`.
 *
 * It connects to the server's SSE endpoint, displays prompts, reads a single-line response,
 * and POSTs the response back to the server.
 */
export async function main(): Promise<void> {
  let args: { url?: string; help: boolean };
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    output.write(`${message}\n\n`);
    printHelp();
    process.exit(1);
  }

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const baseUrl = new URL(
    args.url ?? process.env.MCP_SERVER_URL ?? "http://localhost:4300"
  );
  const streamUrl = new URL(HUMAN_ROUTES.stream, baseUrl);
  const respondUrl = new URL(HUMAN_ROUTES.respond, baseUrl);

  const rl = createInterface({ input, output });

  const queue: Array<{ requestId: string; prompt: string }> = [];
  let processing = false;

  const processQueue = async () => {
    if (processing) return;
    processing = true;

    try {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) continue;

        output.write(`\n(Agent): ${item.prompt}\n`);
        const value = await rl.question("(User): ");

        const res = await fetch(respondUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ requestId: item.requestId, value }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          output.write(
            `\nFailed to send response (HTTP ${res.status}): ${
              text || res.statusText
            }\n`
          );
        }
      }
    } finally {
      processing = false;
    }
  };

  // Reconnect loop.
  for (;;) {
    try {
      output.write(`Connecting to ${streamUrl.toString()} ...\n`);

      const res = await fetch(streamUrl, {
        method: "GET",
        headers: {
          Accept: "text/event-stream",
        },
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Failed to connect to stream (HTTP ${res.status}): ${
            text || res.statusText
          }`
        );
      }

      output.write("Connected. Waiting for prompts...\n");

      for await (const event of parseSse(res.body)) {
        if (event.event !== HUMAN_EVENT_USER_INPUT) {
          continue;
        }

        const parsed = HumanPromptSchema.safeParse(event.json);
        if (!parsed.success) {
          continue;
        }

        queue.push(parsed.data);
        void processQueue();
      }

      output.write("\nDisconnected from server stream. Reconnecting...\n");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      output.write(`\nConnection error: ${message}\n`);
    }

    await sleep(1000);
  }
}

/**
 * Prints CLI usage information.
 */
function printHelp(): void {
  output.write(
    [
      "@copilot/mcp terminal client",
      "",
      "Usage:",
      "  pnpm --filter @copilot/mcp client",
      "",
      "Options:",
      "  --url <baseUrl>   MCP server base URL (default: http://localhost:4300)",
      "  --help            Show help",
      "",
      "Environment:",
      "  MCP_SERVER_URL    Same as --url",
    ].join("\n") + "\n"
  );
}

/**
 * Parses CLI arguments.
 *
 * This client intentionally supports a tiny option set, preferring env vars for configuration.
 */
function parseArgs(argv: string[]): { url?: string; help: boolean } {
  let url: string | undefined;
  let help = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--") {
      // pnpm may inject this argument; treat it as end-of-options.
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }

    if (arg === "--url") {
      url = argv[i + 1];
      i++;
      continue;
    }

    if (arg.startsWith("--url=")) {
      url = arg.slice("--url=".length);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { url, help };
}

/**
 * Parses an SSE byte stream into discrete events.
 *
 * Only the `event:` and `data:` fields are recognized; other SSE fields are ignored.
 */
async function* parseSse(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<{ event: string | undefined; json: unknown }> {
  const decoder = new TextDecoder();
  const reader = stream.getReader();

  let buffer = "";
  let event: string | undefined;
  let data = "";

  const flush = () => {
    if (!data) {
      event = undefined;
      return null;
    }

    const raw = data.endsWith("\n") ? data.slice(0, -1) : data;
    data = "";

    try {
      const json = JSON.parse(raw);
      const out = { event, json };
      event = undefined;
      return out;
    } catch {
      event = undefined;
      return null;
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);

      const trimmed = line.endsWith("\r") ? line.slice(0, -1) : line;

      if (trimmed === "") {
        const evt = flush();
        if (evt) yield evt;
        continue;
      }

      if (trimmed.startsWith(":")) {
        continue; // comment
      }

      if (trimmed.startsWith("event:")) {
        event = trimmed.slice("event:".length).trim();
        continue;
      }

      if (trimmed.startsWith("data:")) {
        data += trimmed.slice("data:".length).trimStart() + "\n";
        continue;
      }

      // Ignore other fields (id, retry, etc.)
    }
  }
}

/**
 * Sleeps for the specified duration.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Run when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
