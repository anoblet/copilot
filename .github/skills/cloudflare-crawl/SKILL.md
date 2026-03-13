---
name: cloudflare-crawl
description: Use Cloudflare's crawl endpoint to run bounded asynchronous site crawls when a task needs multi-page extraction, documentation ingestion, or structured results from one starting URL.
---

# Cloudflare Crawl

Use this skill when repeated single-page fetches are the wrong tool and one entry URL should expand into a managed crawl job.

## Good Fit

- Crawling documentation, help content, or catalogs from one starting page.
- Returning `html` or `markdown` across many discovered pages for ingestion or review.
- Running narrowly scoped `json` extraction on consistent page sets.
- Refreshing content with caching or change windows instead of re-crawling everything.

## Default Workflow

1. Start with the smallest useful crawl: one entry URL, explicit `formats`, conservative `limit`, shallow `depth`, and `render: false` unless JavaScript is required.
2. Send `POST /crawl` and record the returned crawl id.
3. Poll `GET /crawl/{id}?limit=1` until the job reaches a terminal status.
4. Retrieve full results and follow any `cursor` values until pagination is complete.
5. Stop the crawl with `DELETE /crawl/{id}` when the scope is wrong or the job is wasting limits.

## Key Choices

- Use `source: "sitemaps"` for structured sites and `source: "links"` when discovery should follow page links.
- Treat `excludePatterns` as the final filter because it overrides `includePatterns`.
- Use `maxAge` or `modifiedSince` when rerunning crawls against changing content.
- Reserve `formats: ["json"]` for narrow, homogeneous pages with explicit extraction instructions and schema expectations.

## Guardrails

- The endpoint requires a Cloudflare API token with `Browser Rendering - Edit` permission.
- The crawler respects `robots.txt`, `crawl-delay`, and site bot controls; a custom user agent does not bypass them.
- Use `render: false` as the default for static content and early scope validation.
- Long or oversized crawls are safer when split into smaller jobs; jobs can run up to 7 days and results remain available for 14 days after completion.

See [request recipes](references/request-recipes.md) for bounded crawl patterns and polling guidance.