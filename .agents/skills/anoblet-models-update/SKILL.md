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
- Never add requested models to `agents.defaults.model.fallbacks` unless the user explicitly asks for fallback changes. Preserve the fallback array exactly otherwise.
- Do not change the primary model, unrelated providers, agent entries, or auth configuration unless explicitly requested.

## Workflow

1. Read the target config and record the current primary, fallback array, model map, and allowlist.
2. Query the requested providers with `openclaw models list --all --provider <provider> --json`. Use the exact returned `key` values.
3. If a provider query hangs, use a bounded timeout and report the provider-specific limitation. For OpenCode catalogs, a provider's bundled/static catalog may be used only when the CLI cannot return it and the user still wants that provider.
4. Apply the smallest config change. Model entries should default to `{}`; do not overwrite metadata on existing entries.
5. Validate that the file is valid JSON, requested provider counts match expectations, no unintended provider keys changed, and the fallback array is unchanged.

When the user asks to remove a provider, remove only keys with that exact prefix (for example `opencode/`); do not match `opencode-go/` accidentally.
