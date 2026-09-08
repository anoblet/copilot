# Cloudflare crawl

<!-- directory-responsibility -->
Provides the Cloudflare crawl skill. Use Cloudflare's crawl endpoint to run bounded asynchronous site crawls when a task needs multi-page extraction, documentation ingestion, or structured results from one starting URL.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Cloudflare crawl"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```

Git tracking defaults to exclusion. Each tracked directory owns a `.gitignore` that explicitly allows its important immediate files and child directories. Add an allowlist entry when introducing content intended for version control, and give each new child directory its own `.gitignore`. This repository applies the workspace policy independently; its root rules cover root entries only. Existing responsibilities and the diagram remain unchanged.
