---
name: google-search
description: Use the google-search-mcp server for current Google search results when static documentation or local knowledge is insufficient.
compatibility: Requires Node.js, network access, Chromium/Playwright support, and the @mcp-server/google-search-mcp package.
---

# Google Search

Use this skill when a task needs live Google results, regional or multilingual search, or structured result extraction.

## Good Fit

- Current facts, pages, or references that may have changed since training.
- Searches scoped to a language or Google region.
- Research workflows that need result titles, URLs, snippets, and positions.

## Weak Fit

- Questions answerable from the repository or stable official documentation.
- Tasks requiring general web crawling, page screenshots, or full-page extraction.
- High-volume scraping or attempts to bypass access controls.

## Setup

Run the server with:

```bash
npx -y @mcp-server/google-search-mcp@latest
```

For a project MCP configuration:

```json
{
  "mcpServers": {
    "google-search": {
      "command": "npx",
      "args": ["-y", "@mcp-server/google-search-mcp@latest"]
    }
  }
}
```

## Default Workflow

1. Define a focused query and select the needed `limit`.
2. Set `language` and `region` explicitly; use `en-US` and `com` for US English results.
3. Set `timeout` to `60000` milliseconds unless the search is unusually slow.
4. Run the MCP search and inspect the structured results before using them.
5. Open and verify important sources independently when accuracy matters.

Supported parameters are `query` (required), `limit`, `timeout`, `language`, and `region`.

## Guardrails

- Search results are leads, not verified facts; cite or verify primary sources where appropriate.
- Respect Google's terms, robots policies, rate limits, and applicable law.
- CAPTCHA challenges may require headed browser interaction; do not automate around user verification.
- The server may persist browser state in `.google-search-browser-state.json`; treat that file as sensitive and never expose its contents.
- Avoid sending secrets, personal data, or credentials in search queries.

## Reference

Repository: https://github.com/modelcontextprotocol-servers/google-search-mcp
