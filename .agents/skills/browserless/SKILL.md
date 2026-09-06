---
name: browserless
description: Use Browserless to scrape pages, capture screenshots or PDFs, export rendered content, download files, or run browser automation through REST, WebSocket, or MCP integrations when the task depends on live web state rather than static HTTP alone.
compatibility: Requires network access to Browserless. Token-based flows expect a Browserless API token in BROWSERLESS_API_KEY or BROWSERLESS_TOKEN unless the host supports Browserless OAuth.
---

# Browserless

Use this skill when a task needs Browserless-managed browsers instead of local browser infrastructure.

## Good Fit

- Capturing rendered HTML, screenshots, PDFs, or downloads from public pages.
- Running existing Puppeteer or Playwright automation against Browserless-managed browsers.
- Giving an MCP-capable agent access to live-web actions through the hosted Browserless MCP server.
- Handling sites where plain HTTP fetches are insufficient and Browserless features such as stealth, proxies, or session persistence may help.

## Weak Fit

- Tasks that only need a normal HTTP request or static file download.
- Long-lived browser workflows when the host already exposes an equivalent first-party browser tool.
- Sensitive flows where query-string tokens would be logged and header-based auth is available instead.

## Default Workflow

1. Confirm which Browserless interface matches the task: hosted MCP, BaaS v2 WebSocket, REST API, or BrowserQL.
2. Load the API token from `BROWSERLESS_API_KEY` or `BROWSERLESS_TOKEN` at runtime if OAuth is not available.
3. Start with the smallest useful operation and the least powerful interface that fits the task.
4. Prefer REST for one-shot exports and extraction, BaaS v2 for existing Playwright or Puppeteer code or persistent sessions, and BrowserQL for advanced stealth or CAPTCHA handling.
5. Keep region, timeouts, proxy settings, and launch options explicit when behavior depends on them.
6. Return artifacts and structured results with enough metadata to reproduce the request.

## Guardrails

- Never hardcode tokens or commit them to source; read them from runtime secrets only.
- Prefer an `Authorization: Bearer` header when the client supports headers. Use a `?token=` query parameter only when a URL-only client requires it.
- REST endpoints are stateless and single-action. Do not model multi-step workflows as chained REST calls when state must persist.
- Browserless offers multiple regions. Keep the chosen API base URL explicit when latency, geography, or data residency matters.
- Escalate from REST to BaaS or BrowserQL instead of layering brittle retries onto the wrong interface.

## Examples

- A user needs a rendered screenshot or PDF of a URL: use the REST screenshot or PDF endpoint.
- A team already has Playwright code: switch the connection URL to Browserless BaaS v2 instead of rewriting the automation.
- An MCP-capable host needs web scraping, downloads, or custom Puppeteer execution: connect to the hosted Browserless MCP server and use its exported tools.

See [workflow patterns](references/workflows.md) for interface selection, authentication rules, endpoint shapes, and task recipes.

