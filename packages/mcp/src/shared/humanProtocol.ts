import { z } from "zod";

/**
 * Server-Sent Events (SSE) event name for a queued `user_input` request.
 */
export const HUMAN_EVENT_USER_INPUT = "user_input" as const;

/**
 * HTTP routes used by the terminal client.
 */
export const HUMAN_ROUTES = {
  stream: "/human/stream",
  respond: "/human/respond",
} as const;

/**
 * Payload sent over SSE when the MCP server needs terminal input.
 */
export const HumanPromptSchema = z.object({
  requestId: z.string().min(1),
  prompt: z.string().min(1),
});

/**
 * Payload POSTed by the terminal client in response to a human prompt.
 */
export const HumanResponseSchema = z.object({
  requestId: z.string().min(1),
  value: z.string(),
});

/**
 * TypeScript type for {@link HumanPromptSchema}.
 */
export type HumanPrompt = z.infer<typeof HumanPromptSchema>;

/**
 * TypeScript type for {@link HumanResponseSchema}.
 */
export type HumanResponse = z.infer<typeof HumanResponseSchema>;
