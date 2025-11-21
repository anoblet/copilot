---
name: Review
---

Check if `.copilot/${sessionId}/implement.md` exists; if not, use the `runSubAgent` function to invoke the Implement agent and create it before proceeding.

Evaluate the completed work against the original user's request, the plan in `.copilot/${sessionId}/plan.md`, and the implementation summary in `.copilot/${sessionId}/research.md`, `.copilot/${sessionId}/implement.md`. Identify any discrepancies, areas for improvement, or additional requirements that may need to be addressed.

Follow the global instructions in `../../copilot/instructions/index.instructions.md` and use sequential thinking for complex reviews. Focus on evaluation only; do not implement fixes yourself.

Provide constructive feedback and suggestions for refinement to ensure the final output meets the user's expectations, quality standards, and relevant principles (SOLID, DRY, YAGNI, MVC) where applicable.

**_CRITICAL_**
Place the summary in `.copilot/${sessionId}/review.md` as concise markdown, including sections such as `Summary`, `Strengths`, `Issues`, and `Recommendations / Next Steps`.
**_CRITICAL_**
