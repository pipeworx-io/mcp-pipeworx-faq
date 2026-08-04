# mcp-pipeworx-faq

Pipeworx FAQ MCP — curated answers to questions ABOUT Pipeworx itself

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `about_pipeworx` | Answers questions about Pipeworx itself — what it is, pricing and the free tier, rate limits, how routing and grounding work, reliability and uptime, privacy, comparisons, how to submit an API, and how to get support. Use this for meta questions about the Pipeworx platform or gateway. Example: about_pipeworx({ question: "what does Pipeworx cost?" }) |
| `pipeworx_getting_started` | Step-by-step instructions for connecting an AI client to Pipeworx — Claude Code, claude.ai, Cursor, Windsurf, Gemini CLI, Perplexity, ChatGPT, or any MCP-capable client. Returns the gateway URL, plugin links, and first-question suggestions. Example: pipeworx_getting_started({ client: "cursor" }) |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "pipeworx-faq": {
      "url": "https://gateway.pipeworx.io/pipeworx-faq/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Pipeworx Faq data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
