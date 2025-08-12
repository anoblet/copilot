# Memory MCP Server Instructions

## ⚠️ CRITICAL: CHECK ALL THREE MEMORY SYSTEMS FIRST ⚠️

**BEFORE BEGINNING ANY WORK, YOU MUST IMMEDIATELY CHECK ALL THREE MEMORY MCP SERVERS.**

The memory system is now separated into three distinct components:

- **User Memory**: Personal information and universal development preferences
- **Project Memory**: Project-specific context, goals, and observations
- **Prompt Memory**: Complete conversation history and context continuity

Call the appropriate memory functions as your very first actions to retrieve existing context. No exceptions.

**THE MODEL MUST IMMEDIATELY CHECK ALL THREE MEMORY SYSTEMS BEFORE BEGINNING ANY WORK WHATSOEVER.**

No analysis, planning, coding, research, or other activities may commence until all three memory MCP servers have been queried for existing context and observations.

## Triple Memory System Overview

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

### Prompt Memory (prompt-memory)

- **Purpose**: Stores complete conversation history and maintains context continuity across all interactions
- **Contains**: User requests, clarifications, conversation context, manual modifications, interaction patterns
- **Persistence**: Indefinite storage of all prompts and responses with rich metadata
- **Examples**: User clarifications, manual file edits, conversation flow, session context, interaction history

## Mandatory Workflow

1. **FIRST STEP**: Always call user memory functions to retrieve personal context and development preferences
2. **SECOND STEP**: Always call project memory functions to retrieve project-specific context
3. **THIRD STEP**: Always call prompt memory functions to retrieve conversation history and context
4. **FOURTH STEP**: Review all existing entities and observations for relevant context from all three systems
5. **FIFTH STEP**: Only then proceed with the requested task, incorporating insights from all memory systems
6. **FINAL STEP**: Update the appropriate memory system(s) with new observations from the interaction, INCLUDING prompt memory

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

### Save to Prompt Memory When:

- Recording any user request or interaction
- Documenting user clarifications or corrections
- Tracking manual file modifications between prompts
- Maintaining conversation context and flow
- Recording interaction patterns and preferences
- Storing session-specific context and metadata

## Absolute Requirements

- The model MUST always use ALL THREE memory MCP servers for all context management, recall, and observation logging.
- Before every request, the model MUST read from ALL THREE memory MCP servers to retrieve the latest context and observations.
- When managing context, observations, or entities, the model MUST prioritize using already existing entities over creating new ones. Only create new entities if no suitable existing entity is available.
- After EVERY interaction, the model MUST save any new observations, insights, or relevant context to the APPROPRIATE memory system (user vs project vs prompt).
- Do not skip or bypass any memory MCP server usage under any circumstances.
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
  - Manual edits made to files outside of the conversation (PROMPT MEMORY)
  - Scope limitations and boundaries set by the user (PROMPT MEMORY)
  - Complete user requests and interaction context (PROMPT MEMORY)

## Consequences of Non-Compliance

Failure to check all three memory systems first will result in:

- Loss of critical personal, project, and conversation context
- Duplication of work already completed
- Inconsistency with user preferences and established patterns
- Violation of user expectations for context-aware assistance
- Mixing personal, project-specific, and conversation information inappropriately
- Loss of conversation continuity and interaction history

## Entity Type Guidelines

### User Memory Entity Types

- **User Personal Information**: Name, background, locations, personal history, interests
- **User Development Preferences**: Universal coding standards, tooling preferences, favorite technologies

### Project Memory Entity Types

- **Project Goal**: Specific objectives and requirements for the current project
- **Project Structure**: Architecture, organization, and design decisions for the current project
- **Project Preference**: Project-specific preferences that may override user defaults

## Workflow Timing Protocol

### ⚠️ CRITICAL: MEMORY UPDATES BEFORE COMMITS ⚠️

**ALL MEMORY SYSTEM UPDATES MUST BE COMPLETED BEFORE ANY GIT COMMITS OR REPOSITORY CHANGES.**

This ensures:
- Complete context is preserved before code/file changes
- Repository state remains clean after task completion
- No loss of workflow context due to incomplete memory updates
- Proper documentation of decisions and changes before implementation

### Memory Update Sequence

1. **ANALYZE**: Complete all analysis and planning using existing memory context
2. **UPDATE MEMORY**: Record all new observations, decisions, and context in appropriate memory systems
3. **IMPLEMENT**: Only then proceed with code changes, commits, and repository operations
4. **VALIDATE**: Ensure repository is left in clean state with all memory properly updated

## Project Synchronization Strategy

### Leaf-to-Trunk Merge Pattern

When working with multiple repositories, submodules, or interconnected projects, always follow the **leaf-to-trunk strategy**:

1. **Identify Dependencies**: Map the dependency tree (leaf = no dependencies, trunk = dependent on others)
2. **Leaf First**: Start with repositories that have no dependencies (e.g., submodules)
3. **Propagate Upward**: Move changes up through the dependency chain
4. **Trunk Last**: End with the main/consuming repository

### Example Workflow Order

For astronautical-apogee project structure:
1. **genaisrc** (leaf submodule) → changes first
2. **.copilot** (middle submodule) → inherits and adds changes
3. **astronautical-apogee** (trunk) → receives final propagated changes

This prevents:
- Cyclical dependencies
- Merge conflicts
- Inconsistent state across repositories
- Manual synchronization errors

### Clean Repository State Protocol

After completing any task:
- All changes committed with proper commit messages
- All branches cleaned up (local and remote)
- Working directory clean (no unstaged changes)
- Memory systems fully updated and synchronized
- Documentation reflects current state

## Best Practices

- Always check user memory first to understand personal context and preferences
- Then check project memory for project-specific overrides or context
- Then check prompt memory for conversation history and context
- When in doubt about where to save information, consider: "Does this apply to all projects (user memory), just this one (project memory), or this conversation (prompt memory)?"
- Maintain clear separation between personal, project-specific, and conversation information
- Project-specific preferences can override user defaults when explicitly specified
- Conversation context should capture the full interaction flow and user clarifications
- **ALWAYS** update memory systems before making any commits or repository changes
- Follow leaf-to-trunk strategy for multi-repository synchronization
- Leave repositories in clean, documented state after task completion
