---
name: cloudflare-crawl-api
description: Use the Cloudflare Crawl API for multi-page extraction, documentation crawling, and structured site ingestion when a task needs an asynchronous crawl job instead of a single-page fetch.
---

# Cloudflare Crawl API

Use this skill when the task needs content from many pages under one starting URL, such as documentation ingestion, section monitoring, or structured extraction across a site. This workflow assumes access to the crawl endpoint and an API token that can start crawl jobs.

## Good Fit

- Crawling a docs section, help center, or catalog from one entry point.
- Returning `html`, `markdown`, or `json` across many discovered pages.
- Re-running bounded crawls with filters, caching, or change windows.

## Default Workflow

1. Start with the smallest useful scope: one URL, explicit formats, conservative `limit`, and the right `source`.
2. Send `POST /crawl` and record the returned job id.
3. Poll `GET /crawl/{id}?limit=1` until the job leaves `running`.
4. After a terminal status, fetch the full results or paginate with `cursor`.
5. Cancel with `DELETE /crawl/{id}` if the scope is wrong or the job is wasting limits.

## Key Choices

- Use `render: false` when the needed content is already present in the initial HTML.
- Use `source: "sitemaps"` for well-structured documentation sites and `source: "links"` when link discovery matters more than sitemap coverage.
- Use `formats: ["markdown"]` for knowledge ingestion and add `json` only when structured extraction is actually needed.
- Treat `excludePatterns` as the final filter because it overrides `includePatterns`.

## Guardrails

- The crawl respects `robots.txt`, `crawl-delay`, and site bot controls.
- Custom user agents do not bypass protection; the crawler is still identified as a bot.
- Keep early runs small so you can confirm scope, limits, and extraction quality before scaling up.

See [request recipes](references/request-recipes.md) for bounded crawl patterns and polling guidance.