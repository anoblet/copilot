---
name: anoblet-models-update
description: Update an OpenClaw configuration's available model catalog from the OpenClaw CLI, using Codex OAuth for OpenAI and preserving fallback settings.
---

# Anoblet Models Update

Use this skill when the user asks to synchronize, add, remove, or inspect OpenAI/OpenCode models in the local OpenClaw configuration.

## Required behavior

- Work on the user's OpenClaw config, normally `~/.openclaw/openclaw.json`.
- Use the OpenClaw CLI (`openclaw models ...`) to discover model IDs. Prefix shell commands with `rtk` when available.
- For OpenAI, use the configured Codex OAuth profile (`openai:<email>`), not an API key. Confirm it with `openclaw models auth list --json` before querying.
- Treat OpenCode Zen (`opencode/...`) and OpenCode Go (`opencode-go/...`) as separate providers. Only include the provider families the user requests.
- Add or remove entries in `agents.defaults.models` and `agents.defaults.modelPolicy.allow` together. Preserve existing per-model metadata when retaining entries.
- Registering a model in `agents.defaults.models` is **not** enough to make it usable. The same id must also exist in the provider's model list, otherwise the runtime rejects it with `Unknown model: <key>. Found agents.defaults.models[...], but no matching models.providers[...].models[] entry`. See [Registering a new provider model](#registering-a-new-provider-model).
- Never add requested models to `agents.defaults.model.fallbacks` unless the user explicitly asks for fallback changes. Preserve the fallback array exactly otherwise.
- Do not change the primary model, unrelated providers, agent entries, or auth configuration unless explicitly requested.

## Workflow

1. Read the target config and record the current primary, fallback array, model map, and allowlist. Confirm the file is plain `json.dumps(obj, indent=2) + "\n"` before rewriting it, so round-tripping changes nothing else.
2. Query the requested providers with `openclaw models list --all --provider <provider> --refresh --json`. **Always pass `--refresh`**: without it the list is served from the bundled catalog and under-reports. Measured 2026-09-24: `opencode-go` returned 23 models without `--refresh` and 39 with it, and only the refreshed result contained `deepseek-v4.1-flash`. Use the exact returned `key` values.
3. If a provider query hangs, use a bounded timeout and report the provider-specific limitation. For OpenCode catalogs, a provider's bundled/static catalog may be used only when the CLI cannot return it and the user still wants that provider.
4. Apply the smallest config change. Model entries should default to `{}`; do not overwrite metadata on existing entries.
5. Register every newly added id in `models.providers` as described below, then validate.
6. Validate that the file is valid JSON, requested provider counts match expectations, no unintended provider keys changed, and the fallback array is unchanged. Run `openclaw config validate --json` and confirm at least one live `openclaw infer model run` succeeds per newly added route.

When the user asks to remove a provider, remove only keys with that exact prefix (for example `opencode/`); do not match `opencode-go/` accidentally.

## Registering a new provider model

A model id becomes routable only when it appears in `models.providers[<provider>].models[]`. `agents.defaults.models` is the agent catalog/allowlist; `models.providers` is the registration.

- `models.mode` is `merge`, so adding a provider entry adds to the built-in definition instead of replacing it. Verified 2026-09-24: adding `models.providers["opencode-go"]` with only 6 new models left the built-in `opencode-go/glm-5` resolving normally. Only list the ids you are adding; do not restate the built-in catalog.
- Each added entry needs `id` and `name` at minimum.
- Also set `api` and `baseUrl` explicitly on built-in providers. Without them the call fails with `Provider "<provider>" requires an explicit base URL before using an OpenAI-compatible API`. Copy both values from an existing entry via `openclaw infer model inspect --model <an-existing-model-of-that-provider> --json` (for `opencode-go`: `api` `openai-completions`, `baseUrl` `https://opencode.ai/zen/go/v1`).
- Do not add `baseUrl`/`api` for a provider that has no built-in definition; that case needs a full custom provider block and is outside this skill's default scope.

## Verification

- `openclaw config validate --json` must return `{"valid":true,...,"warnings":[]}`.
- `openclaw infer model run --model <key> --prompt "Reply with exactly: OK" --json` must return `"ok": true` for the primary, each fallback, and a sample of newly added models. A resolved catalog entry alone does not prove the route works: on 2026-09-24 `infer model inspect` reported the new model as resolvable while `infer model run` still failed until `api`/`baseUrl` were added.
- Provider-wide failures are not model-entry bugs. On 2026-09-24 every `nvidia/*` call failed with `Auth lookup failed for provider "nvidia"` (secret reference not materialized), independently of the catalog edit; report it rather than editing model entries.
- Check provider count and that a pre-existing model of each touched provider still resolves, to prove the merge did not clobber built-ins.
