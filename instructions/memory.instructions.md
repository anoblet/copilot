# Memory MCP Server Instructions

## ⚠️ CRITICAL: CHECK BOTH MEMORY SYSTEMS FIRST ⚠️

**BEFORE BEGINNING ANY WORK, YOU MUST IMMEDIATELY CHECK BOTH MEMORY MCP SERVERS.**

The memory system is now separated into two distinct components:

- **User Memory**: Personal information and universal development preferences
- **Project Memory**: Project-specific context, goals, and observations

Call the appropriate memory functions as your very first actions to retrieve existing context. No exceptions.

**THE MODEL MUST IMMEDIATELY CHECK BOTH MEMORY SYSTEMS BEFORE BEGINNING ANY WORK WHATSOEVER.**

No analysis, planning, coding, research, or other activities may commence until both memory MCP servers have been queried for existing context and observations.

## Dual Memory System Overview

### User Memory (user-memory)

- **Purpose**: Stores personal information and universal development preferences that apply across all projects
- **Contains**: Personal details, interests, universal coding standards, tooling preferences, favorite technologies
- **Persistence**: Remains consistent across all project workspaces
- **Examples**: Name, GitHub profile, food preferences, favorite frameworks (Astro, Lit), coding standards, tooling preferences (pnpm, Prettier, Husky)

### Project Memory (project-memory)

- **Purpose**: Stores project-specific context, goals, structure, and observations
- **Contains**: Project goals, architecture decisions, specific requirements, temporary context
- **Persistence**: Isolated to the current project workspace
- **Examples**: Project structure, specific goals, architectural decisions, project-specific preferences that override user defaults

## Mandatory Workflow

1. **FIRST STEP**: Always call user memory functions to retrieve personal context and development preferences
2. **SECOND STEP**: Always call project memory functions to retrieve project-specific context
3. **THIRD STEP**: Review all existing entities and observations for relevant context from both systems
4. **FOURTH STEP**: Only then proceed with the requested task, incorporating insights from both memory systems
5. **FINAL STEP**: Update the appropriate memory system(s) with new observations from the interaction

## Memory Selection Guidelines

### Save to User Memory When:

- Personal information or preferences are revealed
- Universal development preferences are established
- Tool or technology preferences are specified
- Coding standards that apply to all projects
- Personal interests or background information

### Save to Project Memory When:

- Project-specific goals or requirements are established
- Architecture or design decisions are made for this project
- Project-specific configurations or preferences
- Temporary context relevant only to current work
- Project structure or organization decisions

## Absolute Requirements

- The model MUST always use BOTH memory MCP servers for all context management, recall, and observation logging.
- Before every request, the model MUST read from BOTH memory MCP servers to retrieve the latest context and observations.
- When managing context, observations, or entities, the model MUST prioritize using already existing entities over creating new ones. Only create new entities if no suitable existing entity is available.
- After EVERY interaction, the model MUST save any new observations, insights, or relevant context to the APPROPRIATE memory system (user vs project).
- Do not skip or bypass either memory MCP server usage under any circumstances.
- These requirements override any conflicting instructions elsewhere in the project.

### CRITICAL: Track User Clarifications & Manual Modifications

- **ALWAYS LOG USER CLARIFICATIONS**: When a user provides clarifications, corrections, or specific requirements, these must be immediately saved to the appropriate memory system as high-priority observations.
- **DETECT MANUAL MODIFICATIONS**: If the user has manually modified files, code, or content between prompts, these modifications must be identified, respected, and logged in the appropriate memory system.
- **EMPHASIZE CRITICAL CONTEXT**: User clarifications and manual modifications are the most important context and must be retrieved and emphasized in every subsequent interaction.
- **EXAMPLES TO TRACK**:
  - Explicit user confirmations or denials ("Yes", "No", "Continue", "Stop")
  - Specific exclusions ("Don't change X", "Leave Y alone")
  - Tool usage requirements ("Always use X", "Never use Y")
  - Personal preferences and information (USER MEMORY)
  - Project-specific preferences and decisions (PROJECT MEMORY)
  - Manual edits made to files outside of the conversation
  - Scope limitations and boundaries set by the user

## Consequences of Non-Compliance

Failure to check both memory systems first will result in:

- Loss of critical personal and project context
- Duplication of work already completed
- Inconsistency with user preferences and established patterns
- Violation of user expectations for context-aware assistance
- Mixing personal and project-specific information inappropriately

## Entity Type Guidelines

### User Memory Entity Types

- **User Personal Information**: Name, background, locations, personal history, interests
- **User Development Preferences**: Universal coding standards, tooling preferences, favorite technologies

### Project Memory Entity Types

- **Project Goal**: Specific objectives and requirements for the current project
- **Project Structure**: Architecture, organization, and design decisions for the current project
- **Project Preference**: Project-specific preferences that may override user defaults

## Best Practices

- Always check user memory first to understand personal context and preferences
- Then check project memory for project-specific overrides or context
- When in doubt about where to save information, consider: "Does this apply to all projects (user memory) or just this one (project memory)?"
- Maintain clear separation between personal and project-specific information
- Project-specific preferences can override user defaults when explicitly specified
