# Cloudflare crawl

<!-- directory-responsibility -->
Provides the Cloudflare crawl skill. Use Cloudflare's crawl endpoint to run bounded asynchronous site crawls when a task needs multi-page extraction, documentation ingestion, or structured results from one starting URL.

Key files: `SKILL.md`.

```mermaid
flowchart LR
    A["Task requiring Cloudflare crawl"] --> B["Apply skill workflow"]
    B --> C["Capability-specific result"]
```
