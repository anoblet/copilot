# Anoblet models update

<!-- directory-responsibility -->

Provides the Anoblet models update skill. Update an OpenClaw configuration's available model catalog from the OpenClaw CLI, using Codex OAuth for OpenAI and preserving fallback settings. The skill covers live provider rediscovery with `--refresh`, dual registration in `agents.defaults.models` and `models.providers[<provider>].models[]` with explicit `api`/`baseUrl`, and route verification through `config validate` and `infer model run`.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Request to add, remove, or inspect models"] --> B["Rediscover the provider live with --refresh"]
    B --> C["Add the id to agents.defaults.models and modelPolicy.allow"]
    C --> D["Register the id in models.providers with api and baseUrl"]
    D --> E["Validate the config and run one live inference per new route"]
    E --> F["Usable catalog or reported provider-level blocker"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. The responsibility statement and diagram above were extended with live provider rediscovery, dual catalog/provider registration, and route verification.
