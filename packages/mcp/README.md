# MCP

Client and server for accepting user input as a tool call. Exposes one tool: 'user_input'. The user will run the client in their terminal. Choose the correct server type. Use TypeScript for both the server and the client. The responsibility of the 'user_input' tool is for the agent to ask the user for input via the terminal. The server will return the user's input to the agent. The client and server should be streamable. The package is part of the `copilot` submodule and should be consumable by the parent repository. Use the `#tools:github/*` tools to reference any GitHub resources.

## VS Code

```
{
    "servers" {
        "local": {
            ...
        }
    }
}
```

## Features

- TypeScript SDK for Model Context Protocol (MCP)

## References

- [main](https://github.com/modelcontextprotocol/typescript-sdk/tree/main)
- [examples](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

## Client

### Usage (From root folder)

```bash
pnpm --filter @copilot/mcp client`
```

## Constraints

- The package should be as simple as possible.
- All code should be documented with TSDoc syntax.
- Do not modify this readme.
- Do not modify the git history.

## Examples

```
(Agent): "Should I choose option A or option B?"
(User): "Option A"
```

```
(Agent): "Should I proceed with the next step?"
(User): "Yes"
```

```
(Agent): "What is the name of the package that you would like to create?"
(User): "my-package"
```
