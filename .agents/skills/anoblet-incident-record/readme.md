# Anoblet-incident-record

Record a runtime incident and its prevention step after a failure is diagnosed and fixed. The entrypoint defines when a record is required, what it must contain, and which owner receives the prevention change. It also requires counting the recurrence from the affected job's run history, because a class that recurs after a prevention step was already applied needs a different systemic change rather than another per-incident note.

Files: [SKILL.md](SKILL.md).

```mermaid
flowchart TD
    A["Failure diagnosed and fixed"] --> B{"Durable lesson?<br/>policy, path, version, or boundary changed"}
    B -->|"no: transient"| C["No record; report the recovery only"]
    B -->|"yes"| D["Read storage/operations/incidents/README.md<br/>and check for an existing record"]
    D --> D2["Count recurrence from the job's run history"]
    D2 --> E{"Class already recorded?"}
    E -->|"yes"| E2["Recurrence means the prevention<br/>was insufficient: change the systemic owner"]
    E -->|"no"| F["Write YYYY-MM-DD_slug.md<br/>symptom, evidence, recovery, prevention, follow-up"]
    E2 --> F
    F --> G["Apply the prevention change at its smallest owner<br/>domain skill, task runbook, or .agents instructions"]
    G --> H["Verify the record and the owner change,<br/>then report path and blockers"]
```

Git tracking is controlled by this directory's `.gitignore`: new entries are ignored until explicitly allowed. The responsibility description and diagram were reviewed for this policy.
