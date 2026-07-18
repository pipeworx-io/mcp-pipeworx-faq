interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Pipeworx FAQ MCP — curated answers to questions ABOUT Pipeworx itself
 * (what it is, pricing, connecting, reliability, comparisons, contact).
 *
 * Every answer is hand-curated copy — this pack deliberately answers ONLY
 * from published information. Questions it can't match return matched:false
 * (the gateway logs those to the _faq_miss AE channel so the copy grows
 * from real questions) plus a polite deflection to bruce@mojibake.ai.
 *
 * Disclosure rules baked into the copy (do not loosen without sign-off):
 * - No team size, structure, funding, revenue, or customer information.
 * - No internal architecture, scraping techniques, or security detail.
 * - Competitor comparisons only where a public benchmark/post exists.
 * - Rate limits quoted at their DOCUMENTED values.
 */


const CONTACT = 'bruce@mojibake.ai';

interface FaqEntry {
  id: string;
  keywords: string[]; // lowercase match tokens; any hit scores
  question: string;
  answer: string;
}

const FAQ: FaqEntry[] = [
  {
    id: 'what-is-pipeworx',
    keywords: ['what is pipeworx', 'about pipeworx', 'pipeworx do', 'explain pipeworx', 'overview'],
    question: 'What is Pipeworx?',
    answer:
      'Pipeworx is an open MCP gateway that connects AI agents to live data — thousands of tools across 1,300+ sources behind one endpoint. Instead of wiring up a separate MCP server per API, you connect once and ask; the router finds and runs the right tool, returning real data instead of guesses.',
  },
  {
    id: 'what-is-mcp',
    keywords: ['what is mcp', 'model context protocol', 'mcp mean', 'mcp standard'],
    question: 'What is MCP?',
    answer:
      'The Model Context Protocol — an open standard that lets AI assistants call external tools and data sources. Pipeworx speaks MCP natively, so anything that supports MCP (Claude, Cursor, Windsurf, Gemini CLI, and others) can use it out of the box.',
  },
  {
    id: 'connect',
    keywords: ['connect', 'install', 'setup', 'set up', 'add to claude', 'add to cursor', 'configure', 'get started', 'getting started', 'how do i use'],
    question: 'How do I connect?',
    answer:
      'Add https://gateway.pipeworx.io/mcp as an MCP server in your client, or use the published plugins (Claude Code, Cursor, Windsurf, Gemini CLI, Perplexity — all on GitHub under pipeworx-io). The get_connection_config tool returns exact copy-paste config for your specific client.',
  },
  {
    id: 'api-key',
    keywords: ['need a key', 'need an api key', 'require key', 'signup required', 'sign up required', 'account required', 'anonymous'],
    question: 'Do I need an API key?',
    answer:
      'No. Anonymous use works immediately (50 requests/day). Sign in with GitHub, Google, or Microsoft for 2,000/day free. Bring your own vendor key for keyed sources, or upgrade for unlimited usage-based access.',
  },
  {
    id: 'pricing',
    keywords: ['cost', 'price', 'pricing', 'how much', 'free', 'pay', 'subscription', 'plan'],
    question: 'What does it cost?',
    answer:
      'There is a free tier with no card required. Paid plans are usage-based with unlimited daily calls — current pricing at https://pipeworx.io/signup.',
  },
  {
    id: 'data-sources',
    keywords: ['what data', 'which sources', 'what sources', 'what apis', 'catalog', 'coverage', 'what can i get', 'kinds of data'],
    question: 'What kinds of data can I get?',
    answer:
      'SEC filings, FRED/BLS economics, global trade, real estate, patents, FDA/clinical data, weather worldwide, prediction markets, US transit in real time, company registries across a dozen countries, government auctions and procurement, crypto, sports, news, and much more. Ask discover_tools with your task, or just ask ask_pipeworx your question directly.',
  },
  {
    id: 'ask-vs-direct',
    keywords: ['ask_pipeworx or', 'individual tools', 'direct tools', 'which tool should', 'route myself'],
    question: 'Should I use ask_pipeworx or the individual tools?',
    answer:
      'ask_pipeworx for one-shot questions — it routes and executes for you. Individual tools when you want precise control over parameters, or you are calling the same source repeatedly.',
  },
  {
    id: 'rate-limits',
    keywords: ['rate limit', 'limits', 'quota', 'requests per day', 'daily limit', 'throttl'],
    question: 'What are the rate limits?',
    answer:
      'Anonymous: 50/day per IP. Bring-your-own-key: 300/day. Signed-in accounts: 2,000/day. Paid: unlimited. Limits reset daily.',
  },
  {
    id: 'byo-key',
    keywords: ['own key', 'my key', 'own api key', 'byo', 'bring your own', '_apikey'],
    question: 'How do I use my own API key for a source?',
    answer:
      'Pass it as _apiKey in any tool call — your key, your quota, your vendor relationship. The tool descriptions say which sources take one and where to get a free key.',
  },
  {
    id: 'reliability',
    keywords: ['uptime', 'reliable', 'reliability', 'status', 'down', 'sla', 'monitoring', 'health'],
    question: 'Is Pipeworx reliable? What is the uptime?',
    answer:
      'Live status at https://pipeworx.io/status. Every source gets synthetic health checks every 15 minutes, plus nightly schema validation and a golden-suite regression harness. Degrading sources get flagged before your agent notices.',
  },
  {
    id: 'open-source',
    keywords: ['open source', 'open-source', 'github', 'source code', 'self host', 'self-host'],
    question: 'Is Pipeworx open source?',
    answer:
      'The client plugins and standalone pack mirrors are — https://github.com/pipeworx-io. The gateway service itself is not.',
  },
  {
    id: 'privacy',
    keywords: ['privacy', 'my queries', 'logged', 'logging', 'data retention', 'gdpr', 'my data', 'tracking'],
    question: 'What happens to my queries?',
    answer:
      'Per the published policy (https://pipeworx.io/privacy): queries are processed to route and answer them, and logged for routing quality and abuse prevention. Data is not sold. Bring-your-own keys are used only for your calls.',
  },
  {
    id: 'feedback',
    keywords: ['report a problem', 'bug', 'broken', 'request a source', 'feature request', 'support', 'help', 'contact'],
    question: 'How do I report a problem or request a source?',
    answer:
      `Call pipeworx_feedback right from your agent — it is triaged daily and misses genuinely drive the build queue. Or email ${CONTACT}.`,
  },
  {
    id: 'submit-api',
    keywords: ['submit', 'add my api', 'list my api', 'my mcp', 'include my'],
    question: 'Can I submit my own API to the catalog?',
    answer: 'Yes — https://pipeworx.io/submit.',
  },
  {
    id: 'routing',
    keywords: ['routing', 'router', 'how does it route', 'how does it work', 'pick the tool', 'find the tool', 'semantic'],
    question: 'How does routing work?',
    answer:
      'Every question goes through a multi-stage resolution pipeline: intent analysis, semantic candidate retrieval across the full catalog, and grounded execution against the live source — with deterministic guarded fast-paths for question shapes we have seen many thousands of times. Each tool carries a continuously refreshed semantic fingerprint weighted by real-world routing outcomes, so the router improves as traffic grows. Misroutes are captured, clustered, and fed back into the catalog nightly.',
  },
  {
    id: 'accuracy',
    keywords: ['accurate', 'accuracy', 'hallucinat', 'trust', 'wrong answers', 'grounded', 'made up'],
    question: 'What makes answers accurate? Do you hallucinate?',
    answer:
      'Answers are grounded, not generated: the router selects a live source and returns its actual output, with structured schemas and machine-readable error hints that let calling agents self-correct in one round trip. If a source has no data, you get an honest empty result — never an invented one.',
  },
  {
    id: 'catalog-maintenance',
    keywords: ['maintained', 'maintain', 'curated', 'keep up to date', 'stale', 'add sources', 'grow'],
    question: 'How is the catalog maintained?',
    answer:
      'A daily enrichment pipeline scrapes, categorizes, scores, embeds, and live-introspects the ecosystem — plus a demand loop: when agents ask for data we do not serve yet, that miss becomes a build queue. Much of the catalog exists because an agent somewhere asked for it.',
  },
  {
    id: 'freshness',
    keywords: ['fresh', 'real-time', 'real time', 'how current', 'up to date', 'latency', 'delay'],
    question: 'How fresh is the data?',
    answer:
      'Most tools are live pass-throughs to the source of record. Where an upstream has no usable API, we ingest and host the data ourselves on a monitored refresh cycle — and say so in the tool output.',
  },
  {
    id: 'why-not-direct',
    keywords: ['call the api directly', 'apis directly', 'why not just', 'why use pipeworx', 'value', 'benefit'],
    question: 'Why not just call the APIs directly?',
    answer:
      'You can! Pipeworx adds what direct calls do not have: discovery across thousands of sources, one auth, normalized outputs with schemas, forgiving inputs (names where APIs want IDs), self-correcting error messages, and health monitoring — so your agent spends tokens on the answer, not the plumbing.',
  },
  {
    id: 'vs-pipedream',
    keywords: ['pipedream'],
    question: 'Pipeworx vs Pipedream?',
    answer:
      'We published a head-to-head grounding benchmark — methodology and results on the blog at https://pipeworx.io/blog, reproducible yourself. Short version: we optimize for grounded live-data answers across the widest source surface.',
  },
  {
    id: 'vs-others',
    keywords: ['zapier', 'apilayer', 'compare', 'versus', ' vs ', 'competitor', 'alternative', 'better than'],
    question: 'Pipeworx vs other platforms?',
    answer:
      'We have not published a comparison with them. What we do publish: live tool count, uptime, and the grounding benchmark — and how to run it against anything. See https://pipeworx.io.',
  },
  {
    id: 'company',
    keywords: ['who is behind', 'who runs', 'who made', 'who built', 'team', 'founder', 'funded', 'funding', 'revenue', 'investors', 'valuation', 'employees', 'company size', 'how big', 'hiring', 'partner'],
    question: 'Who is behind Pipeworx?',
    answer:
      `Pipeworx is built by Mojibake. For partnership, press, or business questions: ${CONTACT}.`,
  },
  {
    id: 'roadmap',
    keywords: ['roadmap', 'coming soon', 'future', 'plans', 'next features', 'upcoming'],
    question: 'What is on the roadmap?',
    answer:
      'We ship daily and announce when things are live — the changelog and blog are the roadmap that already happened. Tell us what you need via pipeworx_feedback; demand signals genuinely drive what gets built next.',
  },
  {
    id: 'build-on-it',
    keywords: ['resell', 'build on', 'commercial use', 'terms', 'license', 'white label'],
    question: 'Can I build a product on Pipeworx?',
    answer:
      `Yes — the API is designed to be built on, and paid tiers are usage-based. Terms at https://pipeworx.io/terms. For volume or OEM arrangements: ${CONTACT}.`,
  },
];

const FALLBACK =
  `That is not something we have published. For partnership, press, or anything else: ${CONTACT} — or ask a data question and I will route it.`;

const tools: McpToolExport['tools'] = [
  {
    name: 'about_pipeworx',
    description:
      'Answers questions about Pipeworx itself — what it is, pricing and the free tier, rate limits, how routing and grounding work, reliability and uptime, privacy, comparisons, how to submit an API, and how to get support. Use this for meta questions about the Pipeworx platform or gateway. Example: about_pipeworx({ question: "what does Pipeworx cost?" })',
    inputSchema: {
      type: 'object' as const,
      properties: {
        question: { type: 'string', description: 'The question about Pipeworx, e.g. "is it free?", "how does routing work?", "what data do you have?"' },
      },
      required: ['question'],
    },
  },
  {
    name: 'pipeworx_getting_started',
    description:
      'Step-by-step instructions for connecting an AI client to Pipeworx — Claude Code, claude.ai, Cursor, Windsurf, Gemini CLI, Perplexity, ChatGPT, or any MCP-capable client. Returns the gateway URL, plugin links, and first-question suggestions. Example: pipeworx_getting_started({ client: "cursor" })',
    inputSchema: {
      type: 'object' as const,
      properties: {
        client: { type: 'string', description: 'Optional client name, e.g. "claude code", "cursor", "windsurf", "gemini", "perplexity", "chatgpt". Omit for generic MCP instructions.' },
      },
    },
  },
];

// ── matching ─────────────────────────────────────────────────────────
function scoreEntry(q: string, e: FaqEntry): number {
  let score = 0;
  for (const kw of e.keywords) {
    if (q.includes(kw)) score += kw.length >= 8 ? 3 : 2;
  }
  // light word-overlap with the canonical question
  const qWords = new Set(q.split(/\W+/).filter((w) => w.length > 3));
  for (const w of e.question.toLowerCase().split(/\W+/)) {
    if (w.length > 3 && qWords.has(w)) score += 1;
  }
  return score;
}

function aboutPipeworx(args: Record<string, unknown>) {
  const q = String(args.question ?? '').toLowerCase().trim();
  if (!q) throw new Error('about_pipeworx requires a question, e.g. { question: "what does Pipeworx cost?" }');

  const ranked = FAQ.map((e) => ({ e, s: scoreEntry(q, e) }))
    .filter((r) => r.s >= 2)
    .sort((a, b) => b.s - a.s);

  if (ranked.length === 0) {
    return {
      matched: false,
      question: args.question,
      answer: FALLBACK,
      browse: 'https://pipeworx.io',
    };
  }
  const best = ranked[0].e;
  return {
    matched: true,
    id: best.id,
    question: best.question,
    answer: best.answer,
    related: ranked.slice(1, 3).map((r) => ({ question: r.e.question, id: r.e.id })),
  };
}

const CLIENT_STEPS: Record<string, string> = {
  'claude code': 'Run: claude mcp add pipeworx --transport http https://gateway.pipeworx.io/mcp — or install the plugin from github.com/pipeworx-io/claude-code-plugin.',
  'claude.ai': 'Settings → Connectors → Add custom connector → https://gateway.pipeworx.io/mcp.',
  cursor: 'Install the plugin from github.com/pipeworx-io/cursor-plugin, or add https://gateway.pipeworx.io/mcp as an MCP server in Cursor settings.',
  windsurf: 'Install from github.com/pipeworx-io/windsurf-plugin, or add the gateway URL as an MCP server in Windsurf settings.',
  gemini: 'Install the extension from github.com/pipeworx-io/gemini-cli-extension.',
  perplexity: 'Install from github.com/pipeworx-io/perplexity-plugin.',
  chatgpt: 'Add https://gateway.pipeworx.io/mcp as a custom connector (Developer mode) in ChatGPT settings.',
};

function gettingStarted(args: Record<string, unknown>) {
  const raw = String(args.client ?? '').toLowerCase().trim();
  const key = Object.keys(CLIENT_STEPS).find((k) => raw.includes(k.split('.')[0].split(' ')[0]) && raw !== '') ?? (raw.includes('claude') ? 'claude code' : '');
  return {
    gateway_url: 'https://gateway.pipeworx.io/mcp',
    client: key || 'generic',
    steps: key
      ? CLIENT_STEPS[key]
      : 'Add https://gateway.pipeworx.io/mcp as an MCP server (HTTP transport) in any MCP-capable client. Client-specific plugins: github.com/pipeworx-io.',
    auth: 'Works anonymously out of the box (50 requests/day). Sign in at https://pipeworx.io/signup for 2,000/day free.',
    first_questions: [
      'ask_pipeworx({question: "AAPL revenue last quarter"})',
      'ask_pipeworx({question: "weather in Tokyo this week"})',
      'discover_tools({task: "real estate comps"})',
    ],
    exact_config: 'For copy-paste config for your client, call get_connection_config.',
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'about_pipeworx':
      return aboutPipeworx(args);
    case 'pipeworx_getting_started':
      return gettingStarted(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
