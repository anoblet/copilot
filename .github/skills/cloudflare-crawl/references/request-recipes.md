# Request Recipes

These patterns assume the standard async lifecycle: `POST /crawl` to start a job, `GET /crawl/{id}` to poll or retrieve results, and `DELETE /crawl/{id}` to cancel a job that should not keep running.

## Minimal Scope Check

Use this first when you need to confirm discovery, cost, and output shape before scaling up.

```json
{
  "url": "https://example.com/docs/",
  "limit": 25,
  "depth": 1,
  "render": false,
  "formats": ["markdown"]
}
```

This is usually the safest way to validate scope before adding rendering, JSON extraction, or wider patterns.

## Documentation Crawl

Use this when the source has a stable docs subtree and Markdown output is the main goal.

```json
{
  "url": "https://example.com/docs/",
  "limit": 200,
  "depth": 4,
  "source": "sitemaps",
  "formats": ["markdown"],
  "options": {
    "includePatterns": ["https://example.com/docs/**"],
    "excludePatterns": [
      "https://example.com/docs/changelog/**",
      "https://example.com/docs/archive/**"
    ]
  }
}
```

Start without patterns if discovery looks wrong, then add include and exclude rules once the crawl shape is confirmed.

## Fast Static Crawl

Use this when the content is already present in the initial HTML and browser execution would only add cost and latency.

```json
{
  "url": "https://example.com/",
  "limit": 100,
  "render": false,
  "formats": ["html", "markdown"]
}
```

This is the cheapest way to validate scope before switching to rendered crawls.

## Protected Content Crawl

Use headers or HTTP authentication when the target content is not public. This still requires an API token with `Browser Rendering - Edit` permission for the crawl request itself.

```json
{
  "url": "https://api.example.com/docs/",
  "limit": 100,
  "setExtraHTTPHeaders": {
    "X-API-Key": "redacted"
  },
  "formats": ["markdown"]
}
```

For basic auth, replace custom headers with an `authenticate` object. Keep the first protected crawl small until access and scope are confirmed.

## Dynamic Page Crawl

Use this when the site renders key content in the browser or needs a readiness selector before extraction.

```json
{
  "url": "https://app.example.com/",
  "limit": 50,
  "formats": ["markdown"],
  "gotoOptions": {
    "waitUntil": "networkidle2",
    "timeout": 60000
  },
  "waitForSelector": {
    "selector": "[data-content-loaded]",
    "timeout": 30000,
    "visible": true
  },
  "rejectResourceTypes": ["image", "media", "font"]
}
```

If the crawl is slow, first confirm the selector is necessary, then reduce page count or switch to `render: false` for sections that do not need JavaScript.

## Structured JSON Extraction

Use `formats: ["json"]` only for narrow, consistent page sets.

- Write extraction instructions that name the exact fields and where they appear on the page.
- Add `jsonOptions.response_format` so the output shape is explicit instead of inferred.
- Start with a small homogeneous subset before scaling to a full site.
- Expect extraction quality to depend on clear extraction instructions, stable page structure, and tight schema discipline.

## Polling And Result Retrieval

- Poll with `GET /crawl/{id}?limit=1` while the job status is `queued` or `running`.
- Treat `completed`, `errored`, `cancelled_due_to_timeout`, `cancelled_due_to_limits`, and `cancelled_by_user` as terminal job states.
- After the job is terminal, fetch the full result set without the lightweight polling limit.
- If the response includes a `cursor`, keep paginating until all records are retrieved.
- Use record-level status filters such as `completed`, `skipped`, or `disallowed` when you need to explain coverage gaps.
- Results remain available for 14 days after completion, so export or process them before the retention window closes.

## Scope And Limits Triage

- If most URLs are `skipped` or `disallowed`, re-check patterns, `source`, and the site's `robots.txt` rules.
- If the job runs too long, reduce `limit`, use `render: false`, or block unnecessary resource types.
- If the job hits limits or approaches the 7-day runtime cap, split the crawl into smaller segments instead of retrying the same oversized request.
- Cancel a crawl early when it is exploring the wrong surface area.
- Remember that `excludePatterns` wins over `includePatterns` when both match the same URL.