# Chroma Memory & Observation Instructions

## Purpose
Provide a mandatory, standardized workflow for using the Chroma MCP tools (defined in `.vscode/mcp.json`) to persist, retrieve, and evolve project memories, observations, decisions, and rationale. Chroma is the durable, queryable vector store for cross‑session recall. It MUST be used before any substantial reasoning, planning, coding, or refactoring.

## Golden Rules
1. ALWAYS query Chroma before starting work on a new request, refinement, or sub‑task.
2. NEVER rely solely on short‑term conversation context if relevant durable knowledge could exist in Chroma.
3. EVERY new architectural decision, assumption, constraint clarification, or non‑obvious tradeoff MUST be written to Chroma.
4. STORE BEFORE COMMIT: Persist observations (what changed, why) prior to staging/committing code.
5. SYNC TRIAD: Use (a) Chroma (vector memories), (b) `memory/` jsonl files, and (c) Serena memories consistently—no drift.
6. DEDUP SMARTLY: Prefer updating or superseding an existing document over creating noisy near‑duplicates.

## Chroma Collections
Use (create if missing) the following collections:
- `project-insights` – Architecture, domain concepts, invariants, system boundaries, API contracts.
- `work-log` – Per-task micro‑summaries: intent, approach, key edits, follow‑ups.
- `decisions` – ADR‑like entries: context, options, decision, consequences.
- `glossary` – Canonical definitions for recurring terms or abbreviations.

(If a collection needs schema evolution, document the change as a new decision entry.)

## Document Schema (Recommended Fields)
Represent each stored Chroma document (where possible) with structured JSON text before embedding:
```
{
  "type": "decision|insight|work-log|glossary",
  "title": "Concise human readable heading",
  "tags": ["memory", "architecture", "api"],
  "timestamp": "<ISO8601>",
  "related": ["other-id-or-title"],
  "summary": "Short 1-3 sentence abstract.",
  "body": "Full detail (bullets allowed).",
  "supersedes": "<id-of-previous-doc-if-applicable>",
  "source": "copilot|manual|automation"
}
```
If the tool interface only accepts raw text: serialize JSON compactly at top, then a markdown body.

## Mandatory Workflow Hooks
| Phase | Action |
|-------|--------|
| BEFORE PLANNING | Query `project-insights`, `decisions`, and `glossary` for keywords from the user request. Summarize matches. |
| DURING ANALYSIS | If you infer unstated assumptions, store them as `insight` (or update an existing one). |
| PRE-IMPLEMENTATION | Write a `work-log` entry capturing plan outline & risk areas. |
| POST-EDIT (PRE-COMMIT) | Append/edit `work-log` with actual changes & divergences from plan. |
| NEW DECISION | Create `decision` entry (include alternatives + rejected reasons). |
| NEW TERM | Add/Update `glossary` entry. |
| TASK COMPLETE | Ensure follow-ups are captured as `work-log` future actions or `decision` consequences. |

## Query Strategy
1. KEYWORD PASS: Use explicit nouns from the user prompt.
2. SEMANTIC PASS: Re-query using 1–2 distilled concept phrases.
3. RELEVANCE FILTER: Ignore hits older than superseding decisions (check `supersedes`).
4. MERGE: Produce a synthesized summary (do not just list raw fragments).

## Update vs New
Create NEW document if:
- A decision reverses/invalidates a previous one (link via `supersedes`).
- A concept is materially redefined.
Update EXISTING if:
- Minor clarification, spelling, or tag improvement.
- Expanding an insight without changing its core meaning (append delta section).

## Quality Guidelines
- Atomic: One clear concept per document.
- Referencable: Use stable, descriptive titles.
- Scoped: Avoid embedding large unrelated code blocks—summarize them.
- Traceable: When tied to code changes, mention file paths (e.g., `src/agent_factory.py`).

## Anti-Patterns (Do NOT)
- Dump entire diffs or full test output.
- Store transient debugging chatter.
- Create vague titles like "Update" or "Misc Notes".
- Omit rationale for a decision.

## Example Entries
Decision:
```
{"type":"decision","title":"Adopt Chroma for durable vector memory","tags":["memory","infra"],"timestamp":"2025-09-18T12:34:56Z","summary":"Chroma chosen over SQLite-only approach for semantic retrieval.","body":"Options: (1) Plain JSONL + grep, (2) SQLite FTS5, (3) Chroma. Chroma chosen for embedding + incremental growth. Consequences: Requires collection hygiene & periodic pruning.","source":"copilot"}
```
Work Log:
```
{"type":"work-log","title":"Implement chroma instruction file","tags":["instructions","memory"],"timestamp":"2025-09-18T12:40:10Z","summary":"Added mandatory Chroma workflow instructions.","body":"Created file at copilot/instructions/chroma.instruction.md; updated index; outlined lifecycle integration.","source":"copilot"}
```

## Enforcement Checklist (Apply Each Task)
- [ ] Queried Chroma (collections: insights, decisions, glossary)
- [ ] Summarized relevant context to guide plan
- [ ] Logged initial work-log entry
- [ ] Captured any new/changed decisions
- [ ] Updated glossary (if new term)
- [ ] Finalized work-log with outcome & follow-ups

## Follow-Up Maintenance
- Quarterly prune: Mark stale docs with a `superseded` link.
- Periodic vector integrity check: Re-embed outdated long documents after major embedding model upgrades.

## Failure Recovery
If Chroma unavailable:
1. Fallback to `memory/*.jsonl` for read.
2. Continue work, but queue a `work-log` placeholder noting offline mode.
3. When restored, backfill the queued entries.

## Success Metric
Consistent, low-friction recall: Similar future tasks should summarize prior relevant context in <10 seconds with minimal redundant reading.

---
This file is authoritative for Chroma usage policy. Update via a documented `decision` entry when making procedural changes.