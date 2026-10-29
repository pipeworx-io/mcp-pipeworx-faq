# mcp-pipeworx-faq

Pipeworx FAQ MCP — curated answers to questions ABOUT Pipeworx itself (what it is, pricing, connecting, reliability, comparisons, contact).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1856+ live data sources. This is an independent, unofficial integration — not affiliated with, endorsed by, or published by the upstream provider.

## Tools

| Tool | Description |
|------|-------------|
| `about_pipeworx` | Answers questions about Pipeworx itself — what it is, pricing and the free tier, rate limits, how routing and grounding work, reliability and uptime, privacy, comparisons, how to submit an API, and how to get support. Use this for meta questions about the Pipeworx platform or gateway. Example: about_pipeworx({ question: "what does Pipeworx cost?" }) |
| `pipeworx_story` | What Pipeworx is building and why: the vision, roadmap direction, where the catalog is deepest, a free keyless call that works right now, and where the project stands. Each section is labelled live, building or direction and dated, with its public source. Omit question for the whole story. Answers questions like "what is Pipeworx building toward?", "where is this going?", "why should I use Pipeworx?". Example: pipeworx_story({ question: "what is pipeworx building?" }) |
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

Both URLs reach the same gateway and the same 1856+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## No MCP client? Call it over HTTP

```bash
curl -X POST https://gateway.pipeworx.io/v1/tools/about_pipeworx \
  -H 'Content-Type: application/json' \
  -d '{"question":"what does Pipeworx cost?"}'
```

No account needed for the first calls. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/about_pipeworx`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.

## Run it from npm

`@pipeworx/mcp-pipeworx-faq` is a local stdio bridge to the Pipeworx gateway: your MCP client
starts it with `npx`, and it forwards every call to the same
`https://gateway.pipeworx.io/pipeworx-faq/mcp` endpoint shown above. It needs network access;
there is no offline mode.

```json
{
  "mcpServers": {
    "pipeworx-faq": {
      "command": "npx",
      "args": ["-y", "@pipeworx/mcp-pipeworx-faq"]
    }
  }
}
```

Without a key it calls anonymously, capped at 50 calls a day. A free account
raises that to 200 a day: get a key at https://pipeworx.io/signup and add
`"env": { "PIPEWORX_API_KEY": "<your key>" }` to the server entry.
The key is sent as a Bearer token, the same way a hosted connection sends it,
so calls are metered and billed exactly as they are there.

It lists **only** this pack's tools by default. Set `PIPEWORX_META_TOOLS=1` to
also list `ask_pipeworx` and the other gateway-wide tools.

Behind an HTTPS proxy: Node's built-in `fetch` does not read `HTTPS_PROXY` by
default. Newer Node releases honour it when `NODE_USE_ENV_PROXY=1` is set; check
your Node version's documentation.

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
