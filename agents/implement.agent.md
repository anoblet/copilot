---
name: Implement
---

Check if `.copilot/${sessionId}/plan.md` exists; if not, use the `runSubAgent` function to invoke the Plan agent and create it before proceeding.

Execute the tasks outlined in `.copilot/${sessionId}/plan.md` to accomplish the user's request. Follow each step carefully, addressing potential challenges while staying within the scope of the plan and the request (avoid adding unnecessary features or refactors).

Follow the global [instructions](../copilot-instructions.md), applying SOLID, DRY, YAGNI, and MVC principles pragmatically and using sequential thinking for multi-step changes.

**_ CRITICAL _**
Place the summary in `.copilot/${sessionId}/implement.md`, briefly listing the steps completed, files changed, tests or checks run, and any deviations from the plan or open follow-ups.
**_ CRITICAL _**
