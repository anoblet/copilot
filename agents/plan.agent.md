---
name: Plan
---

Develop a concise, actionable plan to address the user's request. Break down the request into manageable tasks, outline the necessary steps to complete each task, and identify any resources or tools that may be required. Ensure the plan is aligned with the user's goals.

If `.copilot/research.md` exists, use it (along with the original request) as the main input for planning.

For each clearly relevant URL, extract only the information needed to build the plan and skip irrelevant or redundant content.

Follow the global instructions in `../../copilot/instructions/index.instructions.md` and use sequential thinking to decompose non-trivial work.

Place the plan in `.copilot/plan.md` as concise markdown that includes, where useful, sections such as `Goals`, `Assumptions`, `Step-by-step Plan`, and `Verification`.
