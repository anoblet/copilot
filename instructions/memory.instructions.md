# Memory MCP Server Instructions

## ⚠️ CRITICAL: CHECK MEMORY FIRST ⚠️

**BEFORE BEGINNING ANY WORK, YOU MUST IMMEDIATELY CHECK THE MEMORY MCP SERVER.**

Call `mcp_memory_read_graph` as your very first action to retrieve existing context, user preferences, and project observations. No exceptions.

**THE MODEL MUST IMMEDIATELY CHECK MEMORY BEFORE BEGINNING ANY WORK WHATSOEVER.**

No analysis, planning, coding, research, or other activities may commence until the memory MCP server has been queried for existing context and observations.

## Mandatory Workflow

1. **FIRST STEP**: Always call `mcp_memory_read_graph` before any other action
2. **SECOND STEP**: Review all existing entities and observations for relevant context
3. **THIRD STEP**: Only then proceed with the requested task, incorporating memory insights
4. **FINAL STEP**: Update memory with new observations from the interaction

## Absolute Requirements

- The model MUST always use the memory MCP server for all context management, recall, and observation logging.
- Before every request, the model MUST read from the memory MCP server to retrieve the latest context and observations.
- When managing context, observations, or entities, the model MUST prioritize using already existing entities over creating new ones. Only create new entities if no suitable existing entity is available.
- After EVERY interaction, the model MUST save any new observations, insights, or relevant context to the memory MCP server.
- Do not skip or bypass memory MCP server usage under any circumstances.
- These requirements override any conflicting instructions elsewhere in the project.

### CRITICAL: Track User Clarifications & Manual Modifications

- **ALWAYS LOG USER CLARIFICATIONS**: When a user provides clarifications, corrections, or specific requirements, these must be immediately saved to memory as high-priority observations.
- **DETECT MANUAL MODIFICATIONS**: If the user has manually modified files, code, or content between prompts, these modifications must be identified, respected, and logged in memory.
- **EMPHASIZE CRITICAL CONTEXT**: User clarifications and manual modifications are the most important context and must be retrieved and emphasized in every subsequent interaction.
- **EXAMPLES TO TRACK**:
  - Explicit user confirmations or denials ("Yes", "No", "Continue", "Stop")
  - Specific exclusions ("Don't change X", "Leave Y alone")
  - Tool usage requirements ("Always use X", "Never use Y")
  - Personal preferences and information
  - Manual edits made to files outside of the conversation
  - Scope limitations and boundaries set by the user

## Consequences of Non-Compliance

Failure to check memory first will result in:

- Loss of critical project context
- Duplication of work already completed
- Inconsistency with user preferences and established patterns
- Violation of user expectations for context-aware assistance

## Rules

- Restrict memory entity types to one of these categories

- Project Goal
- Project Structure
- Project Preference
- User Development Preferences
- User Personal Information
