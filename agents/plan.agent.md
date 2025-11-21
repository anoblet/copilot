---
name: Plan
---

Check if `.copilot/${sessionId}/research.md` exists; if not, use the `runSubAgent` function to invoke the Research agent and create it before proceeding.

Use the information from the research to create the plan.

Develop a concise, actionable plan to address the user's request. Break down the request into manageable tasks, outline the necessary steps to complete each task, and identify any resources or tools that may be required. Ensure the plan is aligned with the user's goals.

For each clearly relevant URL, extract only the information needed to build the plan and skip irrelevant or redundant content.

Follow the global instructions in `../../copilot/instructions/index.instructions.md` and use sequential thinking to decompose non-trivial work.

**_CRITICAL_**
Place the plan in `.copilot/${sessionId}/plan.md` as concise markdown that includes, where useful, sections such as `Goals`, `Assumptions`, `Step-by-step Plan`, and `Verification`.
**_CRITICAL_**
