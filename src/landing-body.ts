export const BODY = `
<!-- Toast notification -->
<div class="toast" id="copy-toast">
  <svg viewBox="0 0 16 16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
  Sikeresen másolva!
</div>

<!-- Repo header -->
<div class="repo-header">
  <div class="repo-header-inner">
    <svg width="32" height="32" viewBox="0 0 16 16" fill="#e6edf3"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>
    <a class="repo-owner" href="https://www.eszerzodes.hu">eszerzodes-hu</a>
    <span class="repo-sep">/</span>
    <a class="repo-name" href="#">mcp-server</a>
    <span class="repo-badge">Public</span>
    <div class="repo-actions">
      <button class="repo-btn" onclick="copyText('https://api.eszerzodes.hu/mcp')">
        <svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>
        URL másolás
      </button>

    </div>
  </div>
</div>

<!-- Tab navigation -->
<div class="tab-nav" style="overflow-x: auto;">
  <div class="tab-nav-inner" style="display:flex; padding:0 2rem;">
    <a href="#" class="tab-nav-item active" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"/></svg>
      Dokumentáció
    </a>
    <a href="#telepites" class="tab-nav-item" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"/><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"/></svg>
      Telepítés
    </a>
    <a href="#skillek" class="tab-nav-item" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M4 1.75C4 .784 4.784 0 5.75 0h5.5C12.216 0 13 .784 13 1.75v12.5A1.75 1.75 0 0 1 11.25 16h-5.5A1.75 1.75 0 0 1 4 14.25v-12.5ZM5.75 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-12.5a.25.25 0 0 0-.25-.25h-5.5Z"/></svg>
      AI Skillek
    </a>
    <a href="#eszkozok" class="tab-nav-item" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M11 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM9.5 3a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM4.5 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3.5 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM11 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/></svg>
      44 eszköz
    </a>
    <a href="#proba" class="tab-nav-item" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 0 1 5.378 11.488l2.368 2.368a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-2.368-2.368A7 7 0 1 1 8 1Zm0 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/></svg>
      Próba promptok
    </a>
  </div>
</div>

<div class="container">
  <!-- About box -->
  <div class="about-box">
    <p class="about-desc">📝 Kezeld a szerződéseidet AI-val. MCP szerver az Eszerződés.hu platformhoz — csatlakoztasd a Claude-ot, Cursor-t vagy bármely MCP-kompatibilis eszközt.</p>
    <a class="about-link" href="https://www.eszerzodes.hu">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--text-muted)"><path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 1 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z"/></svg>
      www.eszerzodes.hu
    </a>
    <div class="about-topics">
      <span class="topic-tag">mcp</span>
      <span class="topic-tag">ai</span>
      <span class="topic-tag">contracts</span>
      <span class="topic-tag">eszerzodes</span>
      <span class="topic-tag">claude</span>
      <span class="topic-tag">automation</span>
      <span class="topic-tag">typescript</span>
    </div>
  </div>

  <!-- Stats bar -->
  <div class="stats-bar">
    <div class="stat-item"><div class="stat-dot" style="background:var(--blue)"></div> TypeScript</div>
    <div class="stat-item"><svg viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/></svg> MIT License</div>
    <div class="stat-item"><svg viewBox="0 0 16 16"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/></svg> 44 tools</div>
    <div class="stat-item"><svg viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg> v1.0.0</div>
  </div>

  <!-- AI Gyorsteszt Banner -->
  <div class="ai-banner">
    <div class="ai-banner-text">Kérj tanácsot kedvenc AI asszisztensedtől: vajon mi mindent tud automatizálni számodra az Eszerződés MCP?</div>
    <div class="ai-btn-group">
      <a href="#" onclick="openAIPrompt('chatgpt'); return false;" class="ai-btn" title="ChatGPT">💬 ChatGPT</a>
      <a href="#" onclick="openAIPrompt('claude'); return false;" class="ai-btn" title="Claude AI">🧠 Claude</a>
      <a href="#" onclick="openAIPrompt('perplexity'); return false;" class="ai-btn" title="Perplexity">🔍 Perplexity</a>
      <a href="#" onclick="openAIPrompt('gemini'); return false;" class="ai-btn" title="Google Gemini">✨ Gemini</a>
      <a href="#" onclick="openAIPrompt('grok'); return false;" class="ai-btn" title="Grok">✖️ Grok</a>
    </div>
  </div>

  <!-- File browser -->
  <div class="file-browser">
    <div class="file-header">
      <div class="avatar">E</div>
      <span class="msg">feat: initial MCP server release with 44 tools</span>
      <span class="time">latest</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">src/index.ts</span>
      <span class="fmsg">Express szerver + MCP routing</span>
      <span class="ftime">most</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">src/tools/contracts.ts</span>
      <span class="fmsg">22 szerződés-kezelő eszköz</span>
      <span class="ftime">most</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">src/tools/templates.ts</span>
      <span class="fmsg">11 sablon-kezelő eszköz</span>
      <span class="ftime">most</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">src/tools/parties.ts</span>
      <span class="fmsg">7 partner és munkatárs eszköz</span>
      <span class="ftime">most</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">src/tools/documents.ts</span>
      <span class="fmsg">Dokumentum letöltés + AI extract</span>
      <span class="ftime">most</span>
    </div>
    <div class="file-row">
      <svg viewBox="0 0 16 16"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/></svg>
      <span class="fname">package.json</span>
      <span class="fmsg">@modelcontextprotocol/sdk, express, zod</span>
      <span class="ftime">most</span>
    </div>
  </div>

  <!-- README card -->
  <div class="readme-card">
    <div class="readme-header">
      <svg viewBox="0 0 16 16"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75ZM7.251 11.5Zm.753-5.024Z"/></svg>
      Dokumentáció
    </div>
    <div class="readme-body">
      <h1>📝 Eszerződés.hu MCP Szerver</h1>
      <p>Emeld a szerződéskezelést a következő szintre az Eszerződés.hu MCP Szerverével! Ezzel a technológiával <strong>önálló AI ügynököket (agenteket)</strong> hozhatsz létre, akik a háttérben dolgozva automatizálják a munkafolyamataidat. Add ki az utasításokat természetes nyelven, indíts el komplex feladatokat, és forradalmasítsd a céged adminisztrációját egy dedikált, intelligens asszisztenssel! Csatlakozz a felhő szerverhez pillanatok alatt, vagy telepítsd saját gépeden.</p>

      <div class="status-live"><span class="pulse-dot"></span> Szerver fut &mdash; v1.0.0</div>

      <h2>🔗 Végpontok</h2>
      <table class="endpoint-table">
        <tr><td><span class="method-badge post">POST</span></td><td class="ep-path">/mcp</td><td class="ep-desc">MCP protokoll végpont</td></tr>
        <tr><td><span class="method-badge get">GET</span></td><td class="ep-path">/health</td><td class="ep-desc">Szerver állapot ellenőrzés</td></tr>
      </table>

      <h2 id="telepites" style="scroll-margin-top: 2rem;">🚀 Kezdő lépések</h2>
      <div class="opt-toggle">
        <button class="opt-btn active" onclick="switchOpt('cloud')">☁️ Felhő (ajánlott)</button>
        <button class="opt-btn" onclick="switchOpt('self')">💻 Saját szerver</button>
      </div>

      <!-- Cloud panel -->
      <div id="panel-cloud" class="opt-panel active">
        <h3>1. API token beszerzése</h3>
        <p>Lépj be az <a href="https://www.eszerzodes.hu">eszerzodes.hu</a> fiókodba, és a Beállítások → API menüben generálj egy Bearer tokent.</p>
        <h3>2. AI eszköz csatlakoztatása</h3>
        <div class="ai-pills">
          <button class="ai-pill active" style="--ai-c:#D97706" onclick="switchAi(event,'cc-claude-desktop')"><span class="dot"></span>Claude Desktop</button>
          <button class="ai-pill" style="--ai-c:#D97706" onclick="switchAi(event,'cc-claude-code')"><span class="dot"></span>Claude Code</button>
          <button class="ai-pill" style="--ai-c:#00D084" onclick="switchAi(event,'cc-cursor')"><span class="dot"></span>Cursor</button>
          <button class="ai-pill" style="--ai-c:#00B4D8" onclick="switchAi(event,'cc-windsurf')"><span class="dot"></span>Windsurf</button>
          <button class="ai-pill" style="--ai-c:#7C3AED" onclick="switchAi(event,'cc-cline')"><span class="dot"></span>Cline</button>
          <button class="ai-pill" style="--ai-c:#10A37F" onclick="switchAi(event,'cc-chatgpt')"><span class="dot"></span>ChatGPT</button>
          <button class="ai-pill" style="--ai-c:#2B88D8" onclick="switchAi(event,'cc-copilot')"><span class="dot"></span>Copilot</button>
        </div>
        <div id="cc-claude-desktop" class="ai-config active">
          <p>Szerkeszd a <code class="inline-code">claude_desktop_config.json</code> fájlt (Előfeltétel: Node.js telepítése szükséges):</p>
          <pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"command"</span>: <span class="str">"npx"</span>,
      <span class="str">"args"</span>: [
        <span class="str">"-y"</span>,
        <span class="str">"mcp-remote"</span>,
        <span class="str">"https://api.eszerzodes.hu/mcp"</span>,
        <span class="str">"--header"</span>,
        <span class="str">"Authorization: Bearer &lt;TOKEN&gt;"</span>
      ]
    }
  }
}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-subtle);">Mentés után <strong>teljesen zárd be</strong>, majd indítsd újra a Claude Desktop-ot.</p>
        </div>
        <div id="cc-claude-code" class="ai-config"><pre class="code-block"><code>claude mcp add eszerzodes \\
  --transport http \\
  https://api.eszerzodes.hu/mcp \\
  -H "Authorization: Bearer &lt;TOKEN&gt;"</code></pre></div>
        <div id="cc-cursor" class="ai-config"><p>Settings → MCP Servers → Add:<br><strong>URL:</strong> <code class="inline-code">https://api.eszerzodes.hu/mcp</code><br><strong>Header:</strong> <code class="inline-code">Authorization: Bearer &lt;TOKEN&gt;</code></p></div>
        <div id="cc-windsurf" class="ai-config"><p>Szerkeszd a <code class="inline-code">~/.codeium/windsurf/mcp_config.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"serverUrl"</span>: <span class="str">"https://api.eszerzodes.hu/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  }
}</code></pre></div>
        <div id="cc-cline" class="ai-config"><p>VS Code-ban: Cline → MCP Servers → Configure → szerkeszd a <code class="inline-code">cline_mcp_settings.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"url"</span>: <span class="str">"https://api.eszerzodes.hu/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  }
}</code></pre></div>
        <div id="cc-chatgpt" class="ai-config"><p>ChatGPT Desktop → Settings → Beta features → MCP Servers → Add:</p><pre class="code-block"><code>URL:    https://api.eszerzodes.hu/mcp
Header: Authorization: Bearer &lt;TOKEN&gt;</code></pre></div>
        <div id="cc-copilot" class="ai-config"><p>VS Code-ban add hozzá a <code class="inline-code">.vscode/settings.json</code> fájlhoz:</p><pre class="code-block"><code>{
  <span class="str">"github.copilot.chat.mcp.servers"</span>: [
    {
      <span class="str">"name"</span>: <span class="str">"eszerzodes"</span>,
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"https://api.eszerzodes.hu/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  ]
}</code></pre></div>
      </div>

      <!-- Self-host panel -->
      <div id="panel-self" class="opt-panel">
        <h3>1. API token beszerzése</h3>
        <p>Lépj be az <a href="https://www.eszerzodes.hu">eszerzodes.hu</a> fiókodba, és a Beállítások → API menüben generálj egy Bearer tokent.</p>
        <h3>2. Szerver letöltése és indítása</h3>
        <div class="deploy-tabs">
          <button class="deploy-tab active" onclick="switchDeploy(event,'dep-npm')">npm</button>
          <button class="deploy-tab" onclick="switchDeploy(event,'dep-docker')">Docker</button>
        </div>
        <div id="dep-npm" class="deploy-content active"><pre class="code-block"><code>git clone &lt;repo-url&gt;
cd eszerzodes-mcp
npm install && npm run build
npm start</code></pre></div>
        <div id="dep-docker" class="deploy-content"><pre class="code-block"><code>git clone &lt;repo-url&gt;
cd eszerzodes-mcp
npm run build
docker compose up -d</code></pre></div>
        <p style="font-size:.8rem;color:var(--text-subtle);margin-top:.4rem">A szerver a <code class="inline-code">http://localhost:3000</code> címen indul.</p>
        <h3>3. AI eszköz csatlakoztatása</h3>
        <div class="ai-pills">
          <button class="ai-pill active" style="--ai-c:#D97706" onclick="switchAi(event,'sc-claude-desktop')"><span class="dot"></span>Claude Desktop</button>
          <button class="ai-pill" style="--ai-c:#D97706" onclick="switchAi(event,'sc-claude-code')"><span class="dot"></span>Claude Code</button>
          <button class="ai-pill" style="--ai-c:#00D084" onclick="switchAi(event,'sc-cursor')"><span class="dot"></span>Cursor</button>
          <button class="ai-pill" style="--ai-c:#00B4D8" onclick="switchAi(event,'sc-windsurf')"><span class="dot"></span>Windsurf</button>
          <button class="ai-pill" style="--ai-c:#7C3AED" onclick="switchAi(event,'sc-cline')"><span class="dot"></span>Cline</button>
          <button class="ai-pill" style="--ai-c:#10A37F" onclick="switchAi(event,'sc-chatgpt')"><span class="dot"></span>ChatGPT</button>
          <button class="ai-pill" style="--ai-c:#2B88D8" onclick="switchAi(event,'sc-copilot')"><span class="dot"></span>Copilot</button>
        </div>
        <div id="sc-claude-desktop" class="ai-config active"><p>Szerkeszd a <code class="inline-code">claude_desktop_config.json</code> fájlt (Előfeltétel: Node.js telepítése szükséges):</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"command"</span>: <span class="str">"npx"</span>,
      <span class="str">"args"</span>: [
        <span class="str">"-y"</span>,
        <span class="str">"mcp-remote"</span>,
        <span class="str">"http://localhost:3000/mcp"</span>,
        <span class="str">"--header"</span>,
        <span class="str">"Authorization: Bearer &lt;TOKEN&gt;"</span>
      ]
    }
  }
}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-subtle);">Mentés után <strong>teljesen zárd be</strong>, majd indítsd újra a Claude Desktop-ot.</p>
        </div>
        <div id="sc-claude-code" class="ai-config"><pre class="code-block"><code>claude mcp add eszerzodes \\
  --transport http \\
  http://localhost:3000/mcp \\
  -H "Authorization: Bearer &lt;TOKEN&gt;"</code></pre></div>
        <div id="sc-cursor" class="ai-config"><p>Settings → MCP Servers → Add:<br><strong>URL:</strong> <code class="inline-code">http://localhost:3000/mcp</code><br><strong>Header:</strong> <code class="inline-code">Authorization: Bearer &lt;TOKEN&gt;</code></p></div>
        <div id="sc-windsurf" class="ai-config"><p>Szerkeszd a <code class="inline-code">~/.codeium/windsurf/mcp_config.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"serverUrl"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  }
}</code></pre></div>
        <div id="sc-cline" class="ai-config"><p>VS Code-ban: Cline → MCP Servers → Configure → szerkeszd a <code class="inline-code">cline_mcp_settings.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"url"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  }
}</code></pre></div>
        <div id="sc-chatgpt" class="ai-config"><p>ChatGPT Desktop → Settings → Beta features → MCP Servers → Add:</p><pre class="code-block"><code>URL:    http://localhost:3000/mcp
Header: Authorization: Bearer &lt;TOKEN&gt;</code></pre></div>
        <div id="sc-copilot" class="ai-config"><p>VS Code-ban add hozzá a <code class="inline-code">.vscode/settings.json</code> fájlhoz:</p><pre class="code-block"><code>{
  <span class="str">"github.copilot.chat.mcp.servers"</span>: [
    {
      <span class="str">"name"</span>: <span class="str">"eszerzodes"</span>,
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer &lt;TOKEN&gt;"</span>
      }
    }
  ]
}</code></pre></div>
      </div>

      <div class="skills-banner" id="skillek" style="background:rgba(88,166,255,0.1); border:1px solid rgba(88,166,255,0.4); border-radius:8px; padding:1.2rem; margin:1.5rem 0; scroll-margin-top:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap; margin-bottom:1rem;">
          <div>
            <h3 style="margin-top:0; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; color:var(--text);">🧠 AI Skillek / MCP Promptok</h3>
            <p style="margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.4; max-width:600px;">A 8 fő eszerződés munkafolyamat be van építve a szerverbe mint <strong>MCP Prompt</strong>, de ha a saját projekted könyvtárában dolgozol, le is töltheted a <code class="inline-code">.claude/skills</code> fájlokat és bemásolhatod őket magadhoz.</p>
          </div>
          <a href="/api/download-skills" style="background:var(--blue); color:white; text-decoration:none; padding:0.6rem 1.2rem; border-radius:6px; font-weight:500; font-size:0.85rem; white-space:nowrap; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">📥 Skillek letöltése (.zip)</a>
        </div>
        
        <div id="skills-container"></div>
      </div>

      <h2 id="eszkozok" style="scroll-margin-top: 2rem;">🧰 44 elérhető eszköz</h2>
      <div class="tool-grid" style="grid-template-columns:1fr 1fr">

        <!-- Szerződés Lekérdezések -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">�</span><span class="tc-title">Szerződés Lekérdezések</span><span class="tc-count">5</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Szerződések listázása, keresése, részletek lekérése és lejáró tételek</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_list</span><span class="tool-label">Szerződések listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_get</span><span class="tool-label">Részletek lekérése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_get_by_own_id</span><span class="tool-label">Lekérés belső ID alapján</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_search</span><span class="tool-label">Szabad szöveges keresés</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_get_expiring</span><span class="tool-label">Lejáró szerződések</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Szerződés Műveletek -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">📄</span><span class="tc-title">Szerződés Műveletek</span><span class="tc-count">20</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Létrehozás, aláírás, meghívók kezelése, mellékletek és státuszok módosítása</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_create</span><span class="tool-label">Létrehozás sablonból</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_create_from_pdf</span><span class="tool-label">Létrehozás PDF-ből</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_create_from_html</span><span class="tool-label">Létrehozás HTML-ből</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_delete</span><span class="tool-label">Szerződés törlése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_update_status</span><span class="tool-label">Státusz módosítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_sign</span><span class="tool-label">Aláírás</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_remove_signature</span><span class="tool-label">Aláírás visszavonása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_add_comment</span><span class="tool-label">Megjegyzés hozzáadása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_send_invitation</span><span class="tool-label">Meghívó küldése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_cancel_invitation</span><span class="tool-label">Meghívó visszavonása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_resend_invitation</span><span class="tool-label">Meghívó újraküldése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_add_attachment</span><span class="tool-label">Melléklet hozzáadása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_remove_attachment</span><span class="tool-label">Melléklet eltávolítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_create_shared_link</span><span class="tool-label">Megosztási link</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_list_shared_links</span><span class="tool-label">Linkek listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_delete_shared_link</span><span class="tool-label">Link törlése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_status_list</span><span class="tool-label">Státuszok listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_status_create</span><span class="tool-label">Státusz létrehozása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_status_update</span><span class="tool-label">Státusz módosítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">contract_status_delete</span><span class="tool-label">Státusz törlése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Sablonok -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">📋</span><span class="tc-title">Sablonok</span><span class="tc-count">11</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Sablonok és mezők kezelése, létrehozás, archiválás, rendezés</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_list</span><span class="tool-label">Sablonok listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_get</span><span class="tool-label">Sablon lekérése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_get_fields</span><span class="tool-label">Mezők listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_create</span><span class="tool-label">Sablon létrehozása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_update</span><span class="tool-label">Sablon módosítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_delete</span><span class="tool-label">Sablon törlése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_archive</span><span class="tool-label">Archiválás/visszaállítás</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_add_field</span><span class="tool-label">Mező hozzáadása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_update_field</span><span class="tool-label">Mező módosítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_delete_field</span><span class="tool-label">Mező törlése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">template_reorder_fields</span><span class="tool-label">Mezők rendezése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Partnerek -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">👥</span><span class="tc-title">Partnerek</span><span class="tc-count">3</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Partnerek és hozzájuk tartozó szerződések kezelése</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">party_list</span><span class="tool-label">Partnerek listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">party_search</span><span class="tool-label">Partner keresése</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">party_contracts</span><span class="tool-label">Partner szerződései</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Munkatársak -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">🧑‍💻</span><span class="tc-title">Társfiókok / Munkatársak</span><span class="tc-count">4</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Munkatársak és saját profil adatok kezelése</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_list</span><span class="tool-label">Munkatársak listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_add</span><span class="tool-label">Munkatárs hozzáadása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_remove</span><span class="tool-label">Munkatárs eltávolítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">user_info</span><span class="tool-label">Felhasználói adatok</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Dokumentumok -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">🏷️</span><span class="tc-title">Dokumentumok &amp; AI</span><span class="tc-count">2</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">PDF letöltés, AI-alapú adatkinyerés</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">document_get_download_url</span><span class="tool-label">PDF letöltési URL</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">ai_extract</span><span class="tool-label">AI adatkinyerés</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

      </div>

      <h2 id="proba" style="scroll-margin-top: 2rem;">💬 Próbáld ki — kérdezd az AI-t</h2>
      <div class="prompt-row" onclick="copyText('Listázd ki az összes aktív szerződést')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Listázd ki az összes aktív szerződést&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Melyek járnak le a következő 30 napban?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Melyek járnak le a következő 30 napban?&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Hozz létre egy NDA-t a Teszt Kft.-nek')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Hozz létre egy NDA-t a Teszt Kft.-nek&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Mi a Kovács Kft. szerződéseinek státusza?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Mi a Kovács Kft. szerződéseinek státusza?&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Készíts riportot: státusz megoszlás, lejárók, top partnerek')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Készíts riportot: státusz megoszlás, lejárók, top partnerek&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Keresd meg a bérleti sablont és küldj meghívót')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Keresd meg a bérleti sablont és küldj meghívót&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Nézd át az aláírásra váró szerződéseimet, amik legalább 7 napja stagnálnak, és frissítsd a státuszukat sürgősre')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Nézd át az aláírásra váró szerződéseimet, amik legalább 7 napja stagnálnak, és frissítsd a státuszukat sürgősre&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Vegyél fel egy új munkatársat, kérd be az e-mail címét, a jogkörét (admin, szerkesztő, stb.) és az aláírási jogot')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Vegyél fel egy új munkatársat, kérd be az e-mail címét, a jogkörét (admin, szerkesztő, stb.) és az aláírási jogot&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>
      <div class="prompt-row" onclick="copyText('Telepíts egy új munkafolyamatot, amivel az értékesítéseket tudom nyomon követni (leadtől a megnyertig)')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Telepíts egy új munkafolyamatot, amivel az értékesítéseket tudom nyomon követni (leadtől a megnyertig)&rdquo;</span><span class="prompt-copy"><svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg></span></div>

    </div>
  </div>

  <footer>
    <p>&copy; 2025 Eszerződés.hu &mdash; <a href="https://www.eszerzodes.hu">www.eszerzodes.hu</a></p>
  </footer>
</div>

<script>
function openAIPrompt(platform) {
  const url = window.location.href;
  const promptText = \`Vállalkozóként szeretném megérteni, hogy hogyan segít az Eszerződés.hu MCP Szerver és ez a technológia abban, hogy automatizálni tudjam a szerződéseimet és folyamataimat? Mik a legfontosabb eszközök és mire tudom használni ezt a rendszert? Kérlek olvasd el az itt található dokumentációt és eszközlistát: \${url} majd ajánlj 3-4 konkrét automatizálási/használati esetet!\`;
  const encPrompt = encodeURIComponent(promptText);
  if (platform === 'chatgpt') window.open('https://chatgpt.com/?q=' + encPrompt, '_blank');
  else if (platform === 'claude') window.open('https://claude.ai/new?q=' + encPrompt, '_blank');
  else if (platform === 'perplexity') window.open('https://www.perplexity.ai/search/new?q=' + encPrompt, '_blank');
  else if (platform === 'gemini') window.open('https://gemini.google.com/app?q=' + encPrompt, '_blank');
  else if (platform === 'grok') window.open('https://x.com/i/grok?text=' + encPrompt, '_blank');
}

const COPY_ICON='<svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>';
const CHECK_ICON='<svg viewBox="0 0 16 16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>';
let toastTimer;

function showToast(){
  const t=document.getElementById('copy-toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2000);
}

function copyText(text){
  navigator.clipboard.writeText(text).then(()=>showToast());
}

function copyCode(btn){
  const pre=btn.closest('.code-wrap').querySelector('code');
  const text=pre.textContent;
  navigator.clipboard.writeText(text).then(()=>{
    btn.innerHTML=CHECK_ICON+' Másolva!';
    btn.classList.add('copied');
    showToast();
    setTimeout(()=>{btn.innerHTML=COPY_ICON+' Másolás';btn.classList.remove('copied');},2000);
  });
}

function copySkill(e, btn) {
  e.stopPropagation();
  const pre = btn.closest('.skill-card').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(()=>{
    const old = btn.innerHTML;
    btn.innerHTML = '✅ Másolva';
    btn.style.background = 'var(--bg)';
    showToast();
    setTimeout(()=>{btn.innerHTML = old; btn.style.background = '';}, 2000);
  });
}

function loadSkills() {
  fetch('/api/skills').then(r=>r.json()).then(skills=>{
    const cont = document.getElementById('skills-container');
    if(!cont) return;
    
    if(skills.length===0){
      cont.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem">Nem található skill a szerveren.</span>';
      return;
    }
    
    skills.forEach(skill=>{
      const card = document.createElement('div');
      card.className = 'skill-card';
      
      const header = document.createElement('div');
      header.className = 'skill-header';
      header.onclick = () => card.classList.toggle('expanded');
      
      header.innerHTML = \`
        <div class="skill-title"><span class="tc-chevron">▶</span> <code>\${skill.id}</code></div>
        <div class="skill-actions" onclick="event.stopPropagation()">
          <button class="skill-copy-btn" onclick="copySkill(event, this)">📋 Másolás</button>
        </div>
      \`;
      
      const details = document.createElement('div');
      details.className = 'skill-content';
      details.innerHTML = \`<pre><code>\${skill.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>\`;
      
      card.appendChild(header);
      card.appendChild(details);
      cont.appendChild(card);
    });
  }).catch(err => console.error("Nem sikerült lekérni a skilleket", err));
}

function toggleCard(card,e){
  if(e.target.closest('.toggle')||e.target.closest('.tc-select-all'))return;
  card.classList.toggle('open');
}
function toggleAll(src,e){
  e.stopPropagation();
  const card=src.closest('.tool-card');
  const masterCb=card.querySelector('.tc-select-all input[type=checkbox]');
  const val=masterCb.checked;
  card.querySelectorAll('.tc-tool-row input[type=checkbox]').forEach(cb=>{cb.checked=val;});
  updateCount(card);
}
function updateCount(card){
  const all=card.querySelectorAll('.tc-tool-row input[type=checkbox]');
  const on=[...all].filter(cb=>cb.checked).length;
  const badge=card.querySelector('.tc-count');
  badge.textContent=on+'/'+all.length;
  if(on===all.length) badge.textContent=all.length;
}
// Add change listeners after DOM load
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.tc-tool-row input[type=checkbox]').forEach(cb=>{
    cb.addEventListener('change',()=>{
      const card=cb.closest('.tool-card');
      const all=card.querySelectorAll('.tc-tool-row input[type=checkbox]');
      const on=[...all].filter(c=>c.checked).length;
      card.querySelector('.tc-select-all input[type=checkbox]').checked=on===all.length;
      updateCount(card);
    });
  });
  
  loadSkills();
});

function switchOpt(opt){
  document.querySelectorAll('.opt-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.opt-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-'+opt).classList.add('active');
  event.target.classList.add('active');
}
function switchAi(e,id){
  const pills=e.target.closest('.ai-pills');
  pills.querySelectorAll('.ai-pill').forEach(b=>b.classList.remove('active'));
  e.target.closest('.ai-pill').classList.add('active');
  let next=pills.nextElementSibling;
  while(next&&next.classList.contains('ai-config')){next.classList.remove('active');next=next.nextElementSibling;}
  document.getElementById(id).classList.add('active');
}
function switchDeploy(e,id){
  const container=e.target.closest('.opt-panel');
  container.querySelectorAll('.deploy-tab').forEach(t=>t.classList.remove('active'));
  container.querySelectorAll('.deploy-content').forEach(c=>c.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(id).classList.add('active');
}

// Wrap all code blocks with copy buttons on load
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('pre.code-block').forEach(pre=>{
    const wrap=document.createElement('div');
    wrap.className='code-wrap';
    pre.parentNode.insertBefore(wrap,pre);
    wrap.appendChild(pre);
    const btn=document.createElement('button');
    btn.className='copy-btn';
    btn.innerHTML=COPY_ICON+' Másolás';
    btn.onclick=function(){copyCode(this);};
    wrap.appendChild(btn);
  });
});
</script>`;
