---
description: "Alignment"
---

# Align

## Purpose

Analyze the codebase for alignment with project goals and best practices. This includes reviewing code structure, naming conventions, and adherence to design patterns. Folder structure should also be considered to ensure it reflects the intended architecture.

---

# Personal Assistant

**_ CRITICAL _**
You MUST use the `OPENAI_API_KEY` from the root `.env` file for all OpenAI interactions. Do not hardcode API keys or use any other credentials. Ensure that the key is loaded into the environment before running any agent workflows.
**_ CRITICAL _**

**_ CRITICAL _**
You MUST run the servers, use the Playwright browser tool, and verify that the entire application is functioning correctly after completing your tasks. This includes ensuring that all agents are able to communicate through the orchestrator, that memory is being utilized effectively, and that the client application is responsive and user-friendly.
**_ CRITICAL _**

**_ CRITICAL _**
Before starting ANY work, record the current time in `TIME.md` using the `get_current_time` tool.

Do not stop working until you have spent AT LEAST 1 hour completing the tasks in `TASKS.md`.

Periodically check in with the `get_current_time` tool to see how much time has passed.

If you finish the task before 1 hours has passed, continue working on it until the time is up.
**_ CRITICAL _**

**_ CRITICAL _**
DO NOT STOP UNTIL ALL TASKS IN `TASKS.md` ARE COMPLETE
**_ CRITICAL _**

## Mission

Coordinate a modular, multi-agent assistant with clear responsibilities, robust documentation, and easily updated JSON-driven scaffolding.

## References

- https://langchain-ai.github.io/langgraphjs/tutorials/workflows/

Use this page as a reference for how to implement a modular multi-agent personal assistant.

Use the supervisor-agent pattern to orchestrate the agents.

Remember that the application should be scalable to dozens of agents so choose the best pattern appropriately.

## Agents

- **Personal Assistant** – The supervisor agent that coordinates every specialist, aggregates their outputs, and maintains global context for hand-offs.
- **Therapist** – A specialized agent that delivers mental-health support tailored to user needs.
- **Financial Advisor** – A specialized agent that supplies financial planning guidance and recommendations.

## Software

This is the software that should absolutely should be used in the project:

- Chroma
- LangGraph
- Lit
- TypeScript
- Vite
- Wireit
- Zod

Use `Context7` if you need to get up to date documentation on any of these tools.

## Access & Tooling

- Credentials for the OpenAI provider live in `.env`; load them before executing agent flows.
- Manage dependencies with PNPM and PNPM workspaces; `pnpm dev` from the repository root should launch all three servers concurrently.
- Do not modify the `.chroma` directory. It is managed by VSCode, and is entirely separate from the `packages/memory` package.

## Repository Layout

Use the following directory structure:

- `packages/server/src/agents/therapist`
- `packages/server/src/agents/financial-advisor`
- `packages/client/src/{components,pages,styles}`
- `packages/memory`

## Implementation

### Architecture

- Design each agent strictly around its domain-specific responsibilities to keep behavior focused.
- The project should be modular and easily extensible to add new agents in the future.
- Use SOLID principles to ensure maintainability and scalability.

### Interaction

- Define agent-orchestrator exchanges with JSON schemas that are simple to evolve.
- Ensure every agent exposes a clear API and always routes inter-agent communication through the orchestrator.

### Memory

- The application should provide both short and long term memory.
- The memory package should run the Chroma server and provide a clean API for agents to store and retrieve context.
- Use this server command: `chroma-server --db-dir ./data`.
- Here is an example of the client connection code:

```typescript
import { ChromaClient } from "chromadb";

const client = new ChromaClient();
```

- The Chroma data directory should be inside the `packages/memory` package.
- Use LangChain's Chroma vector store for embedding and retrieving context.
- Each specialized agent should have its own memory for domain-specific context.
- The orchestrator should maintain a global memory for cross-agent context and hand-offs.
- Agents should be able to share both memory and context.
- Use the Chroma client/server model(https://docs.trychroma.com/docs/run-chroma/client-server). Run the Chroma server from the `packages/memory` package and connect to it from the agents and orchestrator.
- Use the `OPENAI_API_KEY` from the root `.env` file for all OpenAI interactions. Do not hardcode API keys or use any other credentials.
- Copy the `.env` file if you need to.
- The memory package should provide a clean API for agents to store and retrieve context.

## Process Guidelines

- Continuously break work into a nested checklist stored in `TASKS.md`, updating it as tasks progress.
- Adhere to the established `packages` directory structure when introducing new files or folders.

**_ DO NOT MODIFY THE `copilot` DIRECTORY _**

After you have completed all of your tasks, use the Playright browser tool to test the client application. Verify that the personal assistant is functioning as expected, and that all agents are interacting correctly through the orchestrator. Ensure that the memory components are storing and retrieving context appropriately for each agent.

**_ DO NOT USE REACT _**

Use Vite + Lit for all client-side components and pages. Follow the atomic design principles outlined in the `packages/client` directory structure. Ensure that all components are reusable, maintainable, and adhere to best practices for web development with Lit.

When implementing new features or making changes, always refer back to the mission and responsibilities of each agent to ensure that their behavior remains focused and aligned with their designated roles. Maintain clear documentation of any changes made to the codebase, including updates to JSON schemas, data contracts, and interaction patterns between agents.

Do not worry about writing tests. Use only the Playwright browser tool to verify that the application is functioning correctly after completing your tasks.
