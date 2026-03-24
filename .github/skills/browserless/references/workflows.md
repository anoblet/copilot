# Workflow Patterns

## Pick The Interface

- Use the hosted Browserless MCP server when the host already supports MCP and the task is naturally agent-driven.
- Use REST APIs for one-shot work such as rendered HTML, structured extraction, screenshots, PDFs, exports, downloads, or basic unblocking.
- Use BaaS v2 when you need full browser control from existing Playwright or Puppeteer code or when session persistence matters.
- Use BrowserQL when the task depends on stronger stealth behavior, CAPTCHA solving, or more advanced anti-bot handling.

## Authentication

- Read the token from runtime secrets, not source control.
- Prefer `BROWSERLESS_API_KEY` first and fall back to `BROWSERLESS_TOKEN` if needed.
- Prefer an `Authorization: Bearer <token>` header when the client supports custom headers.
- Use a `?token=<token>` query parameter only for URL-only clients or URL-based connection strings.
- If the host supports Browserless OAuth for MCP, prefer OAuth instead of manual token handling.

Example token lookup:

```ts
const browserlessToken = process.env.BROWSERLESS_API_KEY ?? process.env.BROWSERLESS_TOKEN;
```

## Regions And Base URLs

Browserless documents these hosted regional API bases:

- `https://production-sfo.browserless.io`
- `https://production-lon.browserless.io`
- `https://production-ams.browserless.io`

Keep the selected region explicit in examples and configuration so latency and data residency are reviewable.

## Common Endpoint Shapes

- Hosted MCP server: `https://mcp.browserless.io/mcp`
- Hosted MCP server with query-token fallback: `https://mcp.browserless.io/mcp?token=<token>`
- Hosted MCP server with explicit Browserless region: `https://mcp.browserless.io/mcp?token=<token>&browserlessUrl=https://production-sfo.browserless.io`
- BaaS v2 Puppeteer or CDP: `wss://production-sfo.browserless.io?token=<token>`
- BaaS v2 Playwright Chromium: `wss://production-sfo.browserless.io/chromium/playwright?token=<token>`
- BaaS v2 Playwright Firefox: `wss://production-sfo.browserless.io/firefox/playwright?token=<token>`
- BaaS v2 Playwright WebKit: `wss://production-sfo.browserless.io/webkit/playwright?token=<token>`
- REST screenshot endpoint: `https://production-sfo.browserless.io/screenshot?token=<token>`
- REST PDF endpoint: `https://production-sfo.browserless.io/pdf?token=<token>`
- REST scrape endpoint: `https://production-sfo.browserless.io/scrape?token=<token>`
- REST content endpoint: `https://production-sfo.browserless.io/content?token=<token>`

## Task Recipes

### One-Shot Extraction Or Capture

- Start with REST endpoints such as `/content`, `/scrape`, `/screenshot`, `/pdf`, or `/export`.
- Keep the request bounded and explicit about timeouts, output format, and wait conditions.
- Do not force multi-step logic into REST when state has to persist across actions.

### Existing Automation Code

- Reuse existing Playwright or Puppeteer code through BaaS v2 by changing the connection URL instead of rewriting the script.
- Keep launch parameters, proxy settings, and browser choice visible in configuration.
- Use persistent sessions only when the workflow actually needs shared browser state.

### Agent-Driven Web Operations

- Use the hosted Browserless MCP server when the host already speaks MCP.
- Prefer the built-in Browserless MCP tools for scraping, export, downloads, and custom browser-side code before dropping to lower-level protocols.
- Choose OAuth when supported. Otherwise inject the token from runtime secrets.

### Anti-Bot Escalation

- Use REST `/unblock` only for basic bot controls and bounded one-shot requests.
- Escalate to BrowserQL when the site requires stronger stealth behavior or CAPTCHA solving.
- Avoid hiding repeated failures with retries when the wrong Browserless interface was chosen.

## Common Limits

- REST APIs are stateless and single-action.
- BaaS and BrowserQL are better fits for multi-step or session-aware flows.
- Query-string tokens can leak into logs and copied URLs, so they are a fallback, not the default.

