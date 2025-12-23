import type { Response } from "express";
import { randomUUID } from "node:crypto";

import {
  HUMAN_EVENT_USER_INPUT,
  HumanPromptSchema,
  HumanResponseSchema,
  type HumanPrompt,
} from "../shared/humanProtocol.ts";

/**
 * Tracks in-flight `user_input` requests and connected terminal clients.
 *
 * This is intentionally minimal and in-memory:
 * - no auth
 * - no persistence
 * - first response wins
 */
export class UserInputBroker {
  private readonly pending = new Map<
    string,
    {
      prompt: string;
      createdAtMs: number;
      resolve: (value: string) => void;
      reject: (err: Error) => void;
      timeout: NodeJS.Timeout | undefined;
    }
  >();

  private readonly sseClients = new Set<Response>();

  /**
   * Registers an Express response as an SSE client.
   *
   * The broker will immediately replay any pending prompts.
   */
  addSseClient(res: Response): void {
    this.sseClients.add(res);

    // Replay current pending requests for late-joining clients.
    for (const [requestId, entry] of this.pending.entries()) {
      this.sendEvent(res, {
        requestId,
        prompt: entry.prompt,
      });
    }

    res.on("close", () => {
      this.sseClients.delete(res);
    });
  }

  /**
   * Creates a new pending prompt and notifies all connected SSE clients.
   */
  async requestUserInput(options: {
    prompt: string;
    timeoutMs: number;
  }): Promise<{ requestId: string; value: string }> {
    const requestId = randomUUID();

    const value = await new Promise<string>((resolve, reject) => {
      const timeout =
        options.timeoutMs > 0
          ? setTimeout(() => {
              this.pending.delete(requestId);
              reject(
                new Error(
                  `Timed out waiting for terminal input after ${options.timeoutMs}ms`
                )
              );
            }, options.timeoutMs)
          : undefined;

      this.pending.set(requestId, {
        prompt: options.prompt,
        createdAtMs: Date.now(),
        resolve,
        reject,
        timeout,
      });

      this.broadcast({ requestId, prompt: options.prompt });
    });

    return { requestId, value };
  }

  /**
   * Attempts to resolve a pending prompt.
   */
  resolveFromHttpBody(
    body: unknown
  ):
    | { ok: true; requestId: string }
    | { ok: false; status: number; message: string } {
    const parsed = HumanResponseSchema.safeParse(body);
    if (!parsed.success) {
      return {
        ok: false,
        status: 400,
        message: "Invalid body; expected { requestId: string, value: string }",
      };
    }

    const { requestId, value } = parsed.data;
    const pending = this.pending.get(requestId);
    if (!pending) {
      return {
        ok: false,
        status: 404,
        message: "No pending request with that requestId",
      };
    }

    this.pending.delete(requestId);
    if (pending.timeout) clearTimeout(pending.timeout);

    // First response wins.
    pending.resolve(value);

    return { ok: true, requestId };
  }

  /**
   * Broadcasts a validated prompt to all currently connected SSE clients.
   */
  private broadcast(prompt: HumanPrompt): void {
    const validated = HumanPromptSchema.parse(prompt);
    for (const res of this.sseClients) {
      this.sendEvent(res, validated);
    }
  }

  /**
   * Sends a single Server-Sent Event (SSE) message to a connected client.
   */
  private sendEvent(res: Response, prompt: HumanPrompt): void {
    // Minimal SSE framing.
    res.write(`event: ${HUMAN_EVENT_USER_INPUT}\n`);
    res.write(`data: ${JSON.stringify(prompt)}\n\n`);
  }
}
