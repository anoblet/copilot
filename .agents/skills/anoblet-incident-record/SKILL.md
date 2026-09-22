---
name: anoblet-incident-record
description: "Record a runtime incident and its prevention step after a failure is diagnosed and fixed. Use when a request asks to document the fix, or to make sure the failure does not happen again."
---

# Runtime incident record

Use this when a failure has been diagnosed and the request includes documenting the fix or preventing recurrence. The incident record is the durable artifact; the prevention step is the skill or runbook update.

## When to write a record

Write one record when any of these holds:

- The request asks to document the fix, or to ensure the failure does not happen again.
- The failure was not transient: it changed a policy, path, version assumption, or authorization boundary.
- The recovery is reusable and another run could hit the same boundary.

Do not write a record for a transient outage that recovered with no change, or for an isolated failure already covered by an existing record.

## Recurrence

Check the existing records and the job's own run history before writing. A failure class that already has a record and has recurred again is not a new incident.

- Read `storage/operations/incidents/README.md` and the records it lists, then read the affected job's recent runs to count the recurrence.
- Record the observed recurrence count and dates in the new record, and cross-reference the earlier one.
- When the class recurs after a prevention step was already applied, the prevention step was insufficient. The required output is a different systemic change — schedule separation, timeout sizing, delivery shape, provider route, or capability gate — not another per-incident note.
- If the same class has recurred and no further systemic change is available, say so plainly and escalate the unresolved boundary instead of restating the symptom.

## Where it goes

`storage/operations/incidents/` in the current workspace owns incident records. That directory's `README.md` owns the naming convention and the review diagram.

- File name: `YYYY-MM-DD_slug.md`.
- One record per incident, dated when the incident occurred, not when it was written.

## Required content

1. Symptom — the observable failure, with the exact message or exit code.
2. Affected helper or task — the script, skill, runbook, or scheduled job.
3. Evidence — the first causal failure, not the final timeout: log lines, status output, exit codes, and the boundary that actually broke.
4. Recovery applied — what was done, and whether it held.
5. Prevention — the owning skill, runbook, or instruction that was updated, and the exact change.
6. Follow-up — anything still blocked, with the smallest next action.

## Procedure

1. Diagnose before recording. Separate an operational outage from a policy gap; record the outage, but the durable lesson belongs to the policy gap.
2. Read `storage/operations/incidents/README.md` and any existing record for the same failure so a duplicate is not created.
3. Write the record before claiming completion. Records are append-only: never rewrite or delete an existing record; add a new dated record and cross-reference the earlier one.
4. Apply the prevention step at its smallest owner: the domain skill, the task runbook, or `.agents` instructions. If the prevention step requires the Workshop lifecycle, hand it there and record the resulting proposal state.
5. Verify the record exists, follows the vault's tracking convention, and that the referenced owner file contains the change.
6. Report the record path, the prevention owner, and any unresolved blocker.

## Boundaries

- Never copy credentials, cookies, private page contents, or personal records into an incident record.
- Do not edit managed database internals or other live runtime state to produce a record.
- A record is provenance, not authorization. Do not re-run a side-effecting workflow to make a record cleaner.
- Report an unverified fix as unverified; do not state that a failure cannot recur.

## Related owners

- Runtime recovery procedures: `anoblet-openclaw` (scheduled tasks, Gateway, Chroma) and `anoblet-browser` (browser control).
- Instruction and skill repair: `anoblet-general`, `anoblet-reflect`, `anoblet-skill-review`.
- Vault conventions and tracking: `storage/README.md`.
