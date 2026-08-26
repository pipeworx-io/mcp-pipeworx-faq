# mcp-pipeworx-faq

Pipeworx FAQ MCP — curated answers to questions ABOUT Pipeworx itself

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

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

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/pipeworx-faq/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Pipeworx Faq data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
