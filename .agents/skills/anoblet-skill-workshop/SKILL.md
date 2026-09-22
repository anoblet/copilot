---
name: "anoblet-skill-workshop"
description: "Handle OpenClaw Skill Workshop work: /learn, learning-from-recent-work requests, and staging, applying, revising, rejecting, quarantining, or retiring a skill proposal without corrupting a live skill."
---

# Skill Workshop lifecycle

Own the governed path for Workshop-generated skills. Local `.agents/skills/anoblet-*` skills are edited directly; Workshop skills change only through this lifecycle.

## Entry points

Use this skill when Andrew invokes `/learn`, asks to learn from recent work, or asks to propose, apply, revise, reject, quarantine, or retire a skill proposal.

## Read the live interface first

```bash
rtk proxy openclaw skills workshop --help
rtk proxy openclaw skills workshop list
rtk proxy openclaw skills list --json
```

`workshop list` shows each proposal's id, state, kind, skill, and title. States observed on 2026-09-22: `pending`, `applied`, `rejected`, `quarantined`, `stale`.

## State machine

- Only a `pending` proposal can be revised, applied, rejected, or quarantined. An `applied` proposal returns `Only pending proposals can be …` for every one of those verbs.
- `reject` and `quarantine` change the proposal, not the skill. Neither removes, disables, or rolls back a skill whose proposal was already applied.
- `stale` means the proposal no longer matches its target. It cannot be revised until the lifecycle restores it to pending; do not repair a stale proposal by editing its files.

## Applying writes content — it never retires

`workshop apply` copies the proposal body into the target `SKILL.md`. It does not rename, move, disable, or delete the skill.

- Stage real replacement content only. A proposal body that says "retire this skill" is not a retirement instruction; applying it replaces a working procedure with a note and degrades the live skill.
- A skill whose proposal was applied while its body held retirement text must be restored from its own create proposal (`workshop inspect <create-id>`) before any other action.

## Retiring a skill

The weekly collection review owns removal from the Workshop collection; there is no CLI retire verb (`curator pin`/`unpin`/`restore` are retired and redirect to collection review).

- Confirm first that the skill's unique content has a home in the surviving owner.
- Retire recoverably: move the skill directory out of `workshop-skills/` into `~/.openclaw/agents/<agent>/agent/retired-skills-archive/<UTC-stamp>/<skill>/`. Never delete the only copy.
- Verify with `openclaw skills list --json` that the skill is absent and the surviving owner is still eligible and visible.
- Record the archive path so the retirement can be reversed.

## Stop condition

One attempt per mechanism. If an apply, reject, or quarantine does not produce the intended effect, the mechanism is wrong — change the mechanism or report the blocker. Do not re-issue the same lifecycle command.

## Ownership boundaries

- Local `.agents/skills/anoblet-*`: direct edits, owned by `anoblet-skill-review`.
- Workshop-generated: `<state-dir>/agents/<agent-id>/agent/workshop-skills/`, owned by this lifecycle.
- This workspace maintains four locally authored `anoblet-*` skills under `copilot/.agents/skills/` and exposes them in `.agents/skills/` through relative symlinks; editing one of those paths edits a file owned by the `copilot` repository.

## Related owners

`anoblet-skill-review` for post-turn local skill review, `anoblet-general` for routing and instruction audits, `anoblet-incident-record` for a durable record when a Workshop failure changes future behavior.
