export const BODY = `
<!-- Node.js Modal -->
<div class="modal-overlay" id="node-modal" onclick="if(event.target===this)closeNodeModal()">
  <div class="modal-card" style="max-width: 600px;">
    <div class="modal-header">
      <h3 style="margin:0;font-size:1rem;color:var(--text)">Node.js telepítése — Claude Desktop előfeltétel</h3>
      <button class="modal-close" onclick="closeNodeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <h2 style="font-size:1.1rem;margin-bottom:0.8rem;border:none">Fent van már a gépeden?</h2>
      <p style="font-size:0.9rem;margin-bottom:0.6rem">Ezzel tudod a terminálban ellenőrizni:</p>
      <div class="config-path-box" style="display:flex;justify-content:space-between;align-items:center">
        <code>node --version</code>
        <button class="btn-mini" onclick="copyText('node --version')">Másolás</button>
      </div>
      <p style="font-size:0.85rem;color:var(--text-muted);margin:0.8rem 0 1.5rem">Ha kapsz egy verziószámot (pl. <code>v20.11.0</code>), akkor kész vagy — <strong>bezárhatod ezt az ablakot</strong>.</p>
      
      <h2 style="font-size:1.1rem;margin-bottom:0.8rem;border:none;padding-top:1rem;border-top:1px solid var(--border)">Telepítési segédlet</h2>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div>
          <h4 style="color:var(--text);margin-bottom:0.5rem">🍏 macOS</h4>
          <ol style="font-size:0.8rem;color:var(--text-muted);padding-left:1.1rem;line-height:1.5">
            <li>Nyisd meg: <a href="https://nodejs.org" target="_blank" style="color:var(--blue)">nodejs.org</a></li>
            <li>Válaszd az <strong>LTS</strong> verziót (ajánlott)</li>
            <li>Futtasd a letöltött <code>.pkg</code> fájlt</li>
            <li>Kattints végig a telepítőn (Next → Install)</li>
          </ol>
        </div>
        <div>
          <h4 style="color:var(--text);margin-bottom:0.5rem">🪟 Windows</h4>
          <ol style="font-size:0.8rem;color:var(--text-muted);padding-left:1.1rem;line-height:1.5">
            <li>Nyisd meg: <a href="https://nodejs.org" target="_blank" style="color:var(--blue)">nodejs.org</a></li>
            <li>Válaszd az <strong>LTS</strong> verziót (ajánlott)</li>
            <li>Futtasd a letöltött <code>.msi</code> fájlt</li>
            <li>Kattints végig a telepítőn (Next → Install)</li>
          </ol>
        </div>
      </div>
      <p style="font-size:0.8rem;color:var(--text-subtle);margin-top:1.2rem;background:rgba(88,166,255,0.05);padding:0.75rem;border-radius:6px;border:1px solid rgba(88,166,255,0.1)">💡 <strong>Tipp:</strong> Telepítés után indítsd újra a Terminált / PowerShellt, hogy felismerje az új parancsot!</p>
    </div>
  </div>
</div>

<!-- Config Modal -->
<div class="modal-overlay" id="config-modal" onclick="if(event.target===this)closeModal()">
  <div class="modal-card">
    <div class="modal-header">
      <h3 style="margin:0;font-size:1rem;color:var(--text)">Hol találom a konfigurációt?</h3>
      <button class="modal-close" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-tabs">
      <div class="modal-tab active" onclick="switchModalTab(this, 'm-mac')">macOS</div>
      <div class="modal-tab" onclick="switchModalTab(this, 'm-win')">Windows</div>
    </div>
    <div class="modal-body">
      <!-- Mac -->
      <div id="m-mac" class="modal-pane active">
        <p style="font-size:0.9rem;margin-bottom:0.8rem">macOS-en a fájl itt található:</p>
        <div class="config-path-box">
          ~/Library/Application Support/Claude/
          <button class="btn-mini" style="position:absolute;right:5px;top:5px" onclick="copyText('~/Library/Application Support/Claude/')">Másolás</button>
        </div>
        <p style="font-size:0.85rem;margin-top:1rem;color:var(--text-muted)">A legegyszerűbb módja, hogy megtaláld:</p>
        <ol style="font-size:0.85rem;color:var(--text-muted);padding-left:1.2rem;line-height:1.6">
          <li>Nyisd meg a <strong>Finder</strong>-t.</li>
          <li>Nyomd meg a <strong>Cmd + Shift + G</strong> billentyűkombinációt.</li>
          <li>Másold be a fenti útvonalat és nyomj Enter-t.</li>
          <li>Ha a <code style="color:var(--blue)">claude_desktop_config.json</code> nem létezik, hozd létre.</li>
        </ol>
        <p style="font-size:0.85rem;margin-top:1rem;color:var(--text-subtle)">Vagy használd ezt a parancsot a terminálban (létrehozza és megnyitja):</p>
        <div class="config-path-box" style="font-size:0.75rem">
          mkdir -p "$HOME/Library/Application Support/Claude" && touch "$HOME/Library/Application Support/Claude/claude_desktop_config.json" && open -e "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
          <button class="btn-mini" style="position:absolute;right:5px;top:5px" onclick="copyText('mkdir -p &quot;$HOME/Library/Application Support/Claude&quot; && touch &quot;$HOME/Library/Application Support/Claude/claude_desktop_config.json&quot; && open -e &quot;$HOME/Library/Application Support/Claude/claude_desktop_config.json&quot;')">Másolás</button>
        </div>
      </div>
      <!-- Win -->
      <div id="m-win" class="modal-pane">
        <p style="font-size:0.9rem;margin-bottom:0.8rem">Windows-on a mappát így éred el:</p>
        <div class="config-path-box">
          %APPDATA%\Claude
          <button class="btn-mini" style="position:absolute;right:5px;top:5px" onclick="copyText('%APPDATA%\\Claude')">Másolás</button>
        </div>
        <ol style="font-size:0.85rem;color:var(--text-muted);padding-left:1.2rem;line-height:1.6">
          <li>Nyomd meg a <strong>Win + R</strong> billentyűkombinációt.</li>
          <li>Másold be a fenti útvonalat és nyomj Enter-t.</li>
          <li>Itt találod (vagy hozd létre) a <code style="color:var(--blue)">claude_desktop_config.json</code> fájlt.</li>
        </ol>
        <p style="font-size:0.85rem;margin-top:1rem;color:var(--text-subtle)">Vagy használd ezt a parancsot PowerShellben:</p>
        <div class="config-path-box" style="font-size:0.75rem">
          if (!(Test-Path "$env:APPDATA\Claude")) { New-Item -ItemType Directory -Path "$env:APPDATA\Claude" }; if (!(Test-Path "$env:APPDATA\Claude\claude_desktop_config.json")) { New-Item -ItemType File -Path "$env:APPDATA\Claude\claude_desktop_config.json" }; notepad "$env:APPDATA\Claude\claude_desktop_config.json"
          <button class="btn-mini" style="position:absolute;right:5px;top:5px" onclick="copyText('if (!(Test-Path &quot;$env:APPDATA\\Claude&quot;)) { New-Item -ItemType Directory -Path &quot;$env:APPDATA\\Claude&quot; }; if (!(Test-Path &quot;$env:APPDATA\\Claude\\claude_desktop_config.json&quot;)) { New-Item -ItemType File -Path &quot;$env:APPDATA\\Claude\\claude_desktop_config.json&quot; }; notepad &quot;$env:APPDATA\\Claude\\claude_desktop_config.json&quot;')">Másolás</button>
        </div>
      </div>
    </div>
  </div>
</div>

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
      <button class="repo-btn" id="copy-url-btn">
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
    <a href="#skills-banner" class="tab-nav-item" onclick="toggleSection('skills', true)" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M4 1.75C4 .784 4.784 0 5.75 0h5.5C12.216 0 13 .784 13 1.75v12.5A1.75 1.75 0 0 1 11.25 16h-5.5A1.75 1.75 0 0 1 4 14.25v-12.5ZM5.75 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-12.5a.25.25 0 0 0-.25-.25h-5.5Z"/></svg>
      AI Skillek
    </a>
    <a href="#eszkozok" class="tab-nav-item" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M11 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM9.5 3a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM4.5 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3.5 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM11 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.5 1a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/></svg>
      49 eszköz
    </a>
    <a href="#gallery-banner" class="tab-nav-item" onclick="toggleSection('gallery', true)" style="text-decoration:none">
      <svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 0 1 5.378 11.488l2.368 2.368a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-2.368-2.368A7 7 0 1 1 8 1Zm0 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/></svg>
      Próba promptok
    </a>
  </div>
</div>

<div class="container">
  <!-- About box -->
  <div class="about-box">
    <p class="about-desc">Kezeld a szerződéseidet AI-val. MCP szerver az Eszerződés.hu platformhoz — csatlakoztasd a Claude-ot, Cursor-t vagy bármely MCP-kompatibilis eszközt.</p>
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
    <div class="stat-item"><svg viewBox="0 0 16 16"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/></svg> 49 tools</div>
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
      <span class="msg">feat: initial MCP server release with 49 tools</span>
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

      <h2 id="telepites" style="scroll-margin-top: 2rem; display:flex; align-items:center; gap:0.5rem">🚀 Kezdő lépések <a href="#" onclick="showNodeModal();return false;" style="font-size:0.75rem; font-weight:400; color:var(--text-muted); margin-left:auto; text-decoration:underline">Node.js telepítési segédlet &rsaquo;</a></h2>
      <div class="test-box">
        <h3 style="margin:0; font-size:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; color:var(--text);">
          <span>🔌 API Kapcsolat Tesztelése</span>
          <a href="https://www.eszerzodes.hu/api-tokens" target="_blank" style="font-size:0.75rem; color:var(--blue); text-decoration:none; font-weight:400; display:flex; align-items:center; gap:0.2rem;">🔑 Új API kulcs generálása &rsaquo;</a>
        </h3>
        <p style="margin:0.5rem 0 0; font-size:0.85rem; color:var(--text-muted);">Ellenőrizd, hogy az API kulcsod érvényes-e és a szerver eléri-e az Eszerződés.hu-t.</p>
        <div class="test-input-group">
          <input type="password" id="test-api-key" class="test-input" placeholder="Illeszd be az API kulcsod (vagy MCP kulcsod)...">
          <button onclick="checkConnection(this)" class="test-btn">Tesztelés Futatása</button>
        </div>
        <div id="test-result" class="test-result"></div>
      </div>

      <div class="opt-toggle">
        <button class="opt-btn active" onclick="switchOpt('cloud')">☁️ Felhő (ajánlott)</button>
        <button class="opt-btn" onclick="switchOpt('self')">💻 Saját szerver</button>
      </div>

      <!-- Cloud panel -->
      <div id="panel-cloud" class="opt-panel active">
        <h3>1. API token beszerzése</h3>
        <p>Lépj be az <a href="https://www.eszerzodes.hu" target="_blank">eszerzodes.hu</a> fiókodba, és a <a href="https://www.eszerzodes.hu/api-tokens" target="_blank">Beállítások → API</a> menüben generálj egy Bearer tokent.</p>
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
          <p>Szerkeszd a <a href="#" onclick="showConfigModal();return false;" style="color:var(--blue);text-decoration:underline">claude_desktop_config.json</a> fájlt:</p>
          <pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"https://api.eszerzodes.hu/mcp/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-subtle);">Mentés után <strong>teljesen zárd be</strong>, majd indítsd újra a Claude Desktop-ot.</p>
        </div>
        <div id="cc-claude-code" class="ai-config">
          <p style="margin-bottom:0.8rem">1. Szerver hozzáadása:</p>
          <pre class="code-block"><code>claude mcp add eszerzodes \\
  --transport http \\
  https://api.eszerzodes.hu/mcp/mcp \\
  -H "Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</code></pre>
          <p style="margin:1rem 0 0.8rem">2. Skillek/Promptok telepítése (ajánlott):</p>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem">A Claude Desktop esetében a skillek automatikusan elérhetőek az MCP-n keresztül. Claude Code használatakor a projekt mappájába kell telepíteni őket:</p>
          <pre class="code-block"><code>cd ~/my-project
curl -sL "https://api.eszerzodes.hu/mcp/api/download-skills" -o /tmp/esz-skills.zip && unzip -qo /tmp/esz-skills.zip -d .claude/skills/ && rm /tmp/esz-skills.zip</code></pre>
        </div>
        <div id="cc-cursor" class="ai-config"><p>Settings → MCP Servers → Add:<br><strong>URL:</strong> <code class="inline-code">https://api.eszerzodes.hu/mcp/mcp</code><br><strong>Header:</strong> <code class="inline-code">Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span></code></p></div>
        <div id="cc-windsurf" class="ai-config"><p>Szerkeszd a <code class="inline-code">~/.codeium/windsurf/mcp_config.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"serverUrl"</span>: <span class="str">"https://api.eszerzodes.hu/mcp/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre></div>
        <div id="cc-cline" class="ai-config"><p>VS Code-ban: Cline → MCP Servers → Configure → szerkeszd a <code class="inline-code">cline_mcp_settings.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"url"</span>: <span class="str">"https://api.eszerzodes.hu/mcp/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre></div>
        <div id="cc-chatgpt" class="ai-config"><p>ChatGPT Desktop → Settings → Beta features → MCP Servers → Add:</p><pre class="code-block"><code>URL:    https://api.eszerzodes.hu/mcp/mcp
Header: Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span></code></pre></div>
        <div id="cc-copilot" class="ai-config"><p>VS Code-ban add hozzá a <code class="inline-code">.vscode/settings.json</code> fájlhoz:</p><pre class="code-block"><code>{
  <span class="str">"github.copilot.chat.mcp.servers"</span>: [
    {
      <span class="str">"name"</span>: <span class="str">"eszerzodes"</span>,
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"https://api.eszerzodes.hu/mcp/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  ]
}</code></pre></div>
      </div>

      <!-- Self-host panel -->
      <div id="panel-self" class="opt-panel">
        <h3>1. API token beszerzése</h3>
        <p>Lépj be az <a href="https://www.eszerzodes.hu" target="_blank">eszerzodes.hu</a> fiókodba, és a <a href="https://www.eszerzodes.hu/api-tokens" target="_blank">Beállítások → API</a> menüben generálj egy Bearer tokent.</p>
        <h3>2. Szerver letöltése és indítása</h3>
        <div class="deploy-tabs">
          <button class="deploy-tab active" onclick="switchDeploy(event,'dep-npm')">npm</button>
          <button class="deploy-tab" onclick="switchDeploy(event,'dep-docker')">Docker</button>
        </div>
        <div id="dep-npm" class="deploy-content active"><pre class="code-block"><code>git clone https://github.com/WiredSign/eszerzodes-mcp.git
cd eszerzodes-mcp
npm install && npm run build
npm start</code></pre></div>
        <div id="dep-docker" class="deploy-content"><pre class="code-block"><code>git clone https://github.com/WiredSign/eszerzodes-mcp.git
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
        <div id="sc-claude-desktop" class="ai-config active">
          <p>Szerkeszd a <a href="#" onclick="showConfigModal();return false;" style="color:var(--blue);text-decoration:underline">claude_desktop_config.json</a> fájlt (Előfeltétel: <a href="#" onclick="showNodeModal();return false;" style="color:var(--blue);text-decoration:underline">Node.js telepítése szükséges</a> a szerver futtatásához):</p>
          <pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-subtle);">Mentés után <strong>teljesen zárd be</strong>, majd indítsd újra a Claude Desktop-ot.</p>
        </div>
        <div id="sc-claude-code" class="ai-config">
          <p style="margin-bottom:0.8rem">1. Szerver hozzáadása:</p>
          <pre class="code-block"><code>claude mcp add eszerzodes \\
  --transport http \\
  http://localhost:3000/mcp \\
  -H "Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</code></pre>
          <p style="margin:1rem 0 0.8rem">2. Skillek/Promptok telepítése (ajánlott):</p>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem">Claude Code használatakor a projekt mappájába érdemes telepíteni a skilleket:</p>
          <pre class="code-block"><code>cd ~/my-project
curl -sL "https://api.eszerzodes.hu/mcp/api/download-skills" -o /tmp/esz-skills.zip && unzip -qo /tmp/esz-skills.zip -d .claude/skills/ && rm /tmp/esz-skills.zip</code></pre>
        </div>
        <div id="sc-cursor" class="ai-config"><p>Settings → MCP Servers → Add:<br><strong>URL:</strong> <code class="inline-code">http://localhost:3000/mcp</code><br><strong>Header:</strong> <code class="inline-code">Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span></code></p></div>
        <div id="sc-windsurf" class="ai-config"><p>Szerkeszd a <code class="inline-code">~/.codeium/windsurf/mcp_config.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"serverUrl"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre></div>
        <div id="sc-cline" class="ai-config"><p>VS Code-ban: Cline → MCP Servers → Configure → szerkeszd a <code class="inline-code">cline_mcp_settings.json</code> fájlt:</p><pre class="code-block"><code>{
  <span class="str">"mcpServers"</span>: {
    <span class="str">"eszerzodes"</span>: {
      <span class="str">"url"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  }
}</code></pre></div>
        <div id="sc-chatgpt" class="ai-config"><p>ChatGPT Desktop → Settings → Beta features → MCP Servers → Add:</p><pre class="code-block"><code>URL:    http://localhost:3000/mcp
Header: Authorization: Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span></code></pre></div>
        <div id="sc-copilot" class="ai-config"><p>VS Code-ban add hozzá a <code class="inline-code">.vscode/settings.json</code> fájlhoz:</p><pre class="code-block"><code>{
  <span class="str">"github.copilot.chat.mcp.servers"</span>: [
    {
      <span class="str">"name"</span>: <span class="str">"eszerzodes"</span>,
      <span class="str">"type"</span>: <span class="str">"http"</span>,
      <span class="str">"url"</span>: <span class="str">"http://localhost:3000/mcp"</span>,
      <span class="str">"headers"</span>: {
        <span class="str">"Authorization"</span>: <span class="str">"Bearer <span class="token-placeholder">&lt;TOKEN&gt;</span>"</span>
      }
    }
  ]
}</code></pre></div>
      </div>



      <h2 id="eszkozok" style="scroll-margin-top: 2rem;">🧰 49 elérhető eszköz</h2>
      <div class="tool-grid" style="grid-template-columns:1fr 1fr">

        <!-- Szerződés Lekérdezések -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">🔍</span><span class="tc-title">Szerződés Lekérdezések</span><span class="tc-count">5</span><span class="tc-chevron">▶</span></div>
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
          <div class="tc-header"><span class="tc-icon">🧑‍💻</span><span class="tc-title">Társfiókok / Munkatársak</span><span class="tc-count">5</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Munkatársak és saját profil adatok kezelése</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_list</span><span class="tool-label">Munkatársak listázása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_add</span><span class="tool-label">Munkatárs hozzáadása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">coworker_remove</span><span class="tool-label">Munkatárs eltávolítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">user_info</span><span class="tool-label">Felhasználói adatok</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">user_branding_update</span><span class="tool-label">Arculat beállítása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
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

        <!-- Automáció & Monitoring -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">🤖</span><span class="tc-title">Automáció & Monitoring</span><span class="tc-count">1</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Szerződés-figyelés és automatikus emlékeztetők küldése</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">check_pending_signatures</span><span class="tool-label">Aláírás-figyelő és emlékeztető</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

        <!-- Külső Integráció -->
        <div class="tool-card" onclick="toggleCard(this,event)">
          <div class="tc-header"><span class="tc-icon">🔌</span><span class="tc-title">Külső Integráció (3rd Party)</span><span class="tc-count">2</span><span class="tc-chevron">▶</span></div>
          <div class="tc-desc">Külső partnerek és sub-accountok távoli kezelése</div>
          <div class="tc-tools">
            <div class="tc-select-all"><label onclick="toggleAll(this,event)">Mind be/ki</label><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked onchange="toggleAll(this.closest('.tool-card'),event)"><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">third_party_register</span><span class="tool-label">Új fiók regisztrálása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
            <div class="tc-tool-row"><span class="tool-name">third_party_get_otp</span><span class="tool-label">Belépési link generálása</span><label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" checked><span class="slider"></span></label></div>
          </div>
        </div>

      </div>


      
      <div class="sec-banner" id="skills-banner" onclick="toggleSection('skills')">
        <div class="sec-header">
          <span class="tc-icon">🧠</span>
          <h2 class="sec-title">AI Skillek / MCP Promptok</h2>
          <span class="sec-chevron" id="skills-chevron">▶</span>
        </div>
      </div>
      
      <div class="sec-content" id="skills-content" style="display:none;">
        <!-- Jó hír highlight box -->
        <div style="background:rgba(63,185,80,0.1); border:1px solid rgba(63,185,80,0.3); border-radius:10px; padding:1rem 1.25rem; margin-bottom:1.5rem; display:flex; align-items:flex-start; gap:1rem">
          <div>
            <h4 style="color:var(--green); margin:0 0 0.25rem; font-size:1rem">Automatikus skillek!</h4>
            <p style="font-size:0.88rem; color:var(--text); line-height:1.5; margin:0">Ha az MCP szerver csatlakozik a <strong>Claude Desktop</strong>-hoz, a lenti 8 beépített skill/prompt <strong>automatikusan elérhető lesz</strong> a szerveren keresztül. Nem kell külön telepítened vagy bemásolnod őket – a Claude azonnal tudni fogja, hogyan kezelje a szerződéseidet!</p>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1.5rem; flex-wrap:wrap; margin: 1rem 0;">
          <div style="flex:1; min-width:300px;">
            <p style="margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.4;">Ha viszont <strong>Claude Code</strong>-ot használsz (terminálból), vagy egyedi plugin-ként szeretnéd kezelni őket, akkor érdemes a projekt mappájába telepíteni. Futtasd ezt a parancsot a terminálban:</p>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items: stretch; justify-content: flex-end;">
            <a class="skill-banner-btn" href="https://api.eszerzodes.hu/mcp/api/download-skills" style="background:var(--blue); color:white; text-decoration:none; padding:0.6rem 1.2rem; border-radius:6px; font-weight:500; font-size:0.85rem; white-space:nowrap; display: flex; align-items: center; justify-content: center; gap: 0.4rem; min-height: 38px;">📥 Skillek letöltése (.zip)</a>
          </div>
          <div class="config-path-box" style="margin-top:0.75rem; font-size:0.75rem; background:var(--bg); padding:0.6rem 0.8rem; border-radius:6px; border:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; gap:1rem;">
            <code style="color:var(--text); word-break:break-all">curl -sL "https://api.eszerzodes.hu/mcp/api/download-skills" -o /tmp/esz-skills.zip && unzip -qo /tmp/esz-skills.zip -d .claude/skills/ && rm /tmp/esz-skills.zip</code>
            <button class="btn-mini" onclick="copyText('curl -sL &quot;https://api.eszerzodes.hu/mcp/api/download-skills&quot; -o /tmp/esz-skills.zip && unzip -qo /tmp/esz-skills.zip -d .claude/skills/ && rm /tmp/esz-skills.zip')">Másolás</button>
          </div>
        </div>
        <div id="skills-container"></div>
      </div>

      <!-- 💬 Prompt Galéria -->
      <div class="sec-banner" id="gallery-banner" onclick="toggleSection('gallery')">
        <div class="sec-header">
          <span class="tc-icon">💬</span>
          <h2 class="sec-title">Próbáld ki — Prompt Galéria</h2>
          <span class="sec-chevron" id="gallery-chevron">▶</span>
        </div>
      </div>

      <div class="sec-content" id="gallery-content" style="display: none;">
        <p class="sec-desc-inline">Kattints egy sorra a prompt másolásához, majd illeszd be a Claude Desktopba!</p>
        <div class="prompt-gallery">
        <!-- 0. Indulás -->
        <div class="prompt-cat" style="border-color: var(--green);">
          <div class="pc-header">✨ Gyors indulás & Onboarding <span class="pc-badge" style="background:var(--green)">Új</span></div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Vezess végig az Eszerződés.hu beállításán: először kérdezd meg a cégem nevét vagy weblapunk címét, és az alapján segíts beállítani az arculatomat (branding). Utána állítsunk be egy egyedi státusz munkafolyamatot (kérdezz rá, milyen típusú folyamatot szeretnék). Ezután elemezd, kiket érdemes hozzáadnom társfiókként vagy munkatársként a rendszerhez. Kérdezz rá, hogy szeretnék-e lejárati/megújítási logikát a határozott idejű szerződésekhez (riasztás lejárat előtt X nappal), és alakítsunk ki egy riporting rendszert. Végül ajánld fel, hogy kiküldjük együtt az első teszt szerződésemet &bdquo;Szerződés tesztelésre&rdquo; típussal, és kérd be hozzá a célszemély email címét!')">
              <span class="prompt-icon">🚀</span>
              <span class="prompt-text" style="color:var(--text); font-weight:600;">&ldquo;Vezess végig a teljes beállításon és az első szerződésemen&rdquo;</span>
            </div>
          </div>
        </div>
        <!-- 1. Lekérdezés -->
        <div class="prompt-cat">
          <div class="pc-header">🔍 Dashboard & Statisztika</div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Listázd ki az összes aktív szerződést')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Listázd az aktív szerződéseket&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Készíts riportot: státusz megoszlás, lejárók, top partnerek')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Készíts teljes riportot&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Mi a Kovács Kft. szerződéseinek státusza?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Partner-specifikus lekérdezés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Melyik sablont használtam a legtöbbször az elmúlt 3 hónapban?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Sablon használati statisztika&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Ki a legaktívabb partnerem a szerződések száma alapján?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Legaktívabb partnerek listája&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Mutasd a 2025-ös évi összes aláírt szerződésem listáját havi bontásban!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Éves szerződés-áttekintés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Mekkora a jelenlegi várólistám? Hány partner nem írta még alá a kiküldött meghívókat?')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Várakozási lista és kitöltési arány&rdquo;</span></div>
          </div>
        </div>

        <!-- 2. Műveletek -->
        <div class="prompt-cat">
          <div class="pc-header">✍️ Szerződéskezelés</div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Hozz létre egy NDA-t a Teszt Kft.-nek')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Új NDA létrehozása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Keresd meg a bérleti sablont és küldj meghívót')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Sablon keresés & Meghívó&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Vegyél fel egy új munkatársat, kérd be az e-mail címét, a jogkörét és az aláírási jogot')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Munkatárs meghívása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Segíts beállítani az egyedi arculatomat: színek, logók, e-mail fejléc és egyedi szövegek.')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Egyedi branding beállítása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Töltsd fel ezt a PDF-et, és készíts belőle egy új szerződést a minta.pdf néven!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Új szerződés PDF feltöltéssel&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Módosítsd a \'Mérnöki szerződés\' sablonban a \'Díj\' mező alapértelmezett értékét 150.000 Ft-ra!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Sablon mező alapérték módosítás&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Archiváld az összes olyan sablont, amit több mint egy éve nem használtunk!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Sablon-tárhely karbantartás&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Vegyél fel egy új \'Bérbeadó\' típusú partnert minden szükséges adattal (cím, adószám, képviselő)!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Komplett partner regisztráció&rdquo;</span></div>
          </div>
        </div>

        <!-- 3. Arculat & Branding -->
        <div class="prompt-cat">
          <div class="pc-header">🎨 Arculat & Branding</div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Ennek a cégnek az arculati színeit, logóját és háttérképét állítsd be a levélsablonban: https://www.eszerzodes.hu')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Komplett arculat beállítása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Állítsd be a kísérőlevelet erre a tartalomra: Üdvözöljük! Kérjük, írja alá a mellékelt dokumentumot. Üdvözlettel: [Cégnév] Csapata')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Kísérőlevél szövegének módosítása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Használd a cégem színeit (főszín: #2b88d8) az Eszerződés felületén és az e-mail háttérben!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Színvilág testreszabása (HEX)&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Frissítsd a logómat erről az URL-ről: [URL] és kapcsold be a megjelenítését a szerződéseken!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Logó frissítése & Bekapcsolása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Állíts be egy elegáns háttérképet a szerződéseimnek és engedélyezd az egyedi stílust!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Prémium megjelenés aktiválása&rdquo;</span></div>
          </div>
        </div>

        <!-- 4. Automáció -->
        <div class="prompt-cat">
          <div class="pc-header">🤖 Automáció <span class="pc-badge auto">Szerver-oldali</span></div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Figyeld a függő szerződéseimet: ha találsz olyat, ami több mint 5 napja vár aláírásra, küldj automatikus emlékeztetőt és készíts róla egy táblázatos jelentést')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Aláírás figyelés & Emlékeztető&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Nézd át az aláírásra váró szerződéseimet, amik legalább 7 napja stagnálnak, és frissítsd a státuszukat sürgősre')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Automatikus státusz-frissítés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Telepíts egy új munkafolyamatot, amivel az értékesítéseket tudom nyomon követni (leadtől a megnyertig)')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Munkafolyamat (CRM) telepítés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Minden hétfőn reggel nézd át the 7 napnál régebbi várakozó szerződéseimet és küldj nekem egy listát róluk!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Ütemezett hétfői ellenőrzés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Ha egy szerződés lejárata 14 napon belül van, automatikusan állítsd a belső státuszát \'Megújítás alatt\'-ra!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Automata lejárati eszkaláció&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Figyeld az elutasított szerződéseket: ha egy partner elutasítja, jegyezd fel és értesíts azonnal!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Elutasítás-figyelő rendszer&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Elemezd, hogy vannak-e határozott idejű szerződéseim, és állíts be egy automatikus riasztást a lejáratuk előtt 30 nappal!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Lejárati & megújítási riasztás&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Készíts egy automata munkafolyamatot, ami új partner regisztrációjakor azonnal kiküld egy \'Üdvözlő NDA\' sablont!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Automata Üdvözlő-NDA workflow&rdquo;</span></div>
          </div>
        </div>
 
        <!-- 5. Pro Workflows -->
        <div class="prompt-cat" style="border-color: rgba(210, 153, 34, 0.4);">
          <div class="pc-header">🚀 Pro Munkafolyamatok <span class="pc-badge pro">Advanced</span></div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('PRO SZINT: Keresd meg a legrégebbi aláíratlan szerződésemet, hasonlítsd össze a sablonjával, hogy minden mező ki van-e töltve, töltsd le a PDF változatát és foglald össze nekem 3 pontban, miért akadhatott el a folyamat a partner adatai alapján!')"><span class="prompt-icon">🚀</span><span class="prompt-text" style="color:var(--blue); font-weight:600;">&ldquo;Teljes folyamat-diagnosztika&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Ha érkezik egy új aláírt szerződésem, töltsd le, vonj ki belőle minden fontos dátumot az ai_extract segítségével, és készíts róluk egy emlékeztető listát')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Adatkinyerés signed PDF-ből&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Hasonlítsd össze a Bérleti szerződés és az NDA sablonjaimat: melyek az átfedő változók, és melyiknél kell több adatot bekérni a partnertől?')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Sablon összehasonlítás&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Elemezd az összes \'Bérleti\' típusú szerződésem: van benne olyan, aminek a lejárata után nem kötöttük meg az újat?')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Bérleti folytonosság audit&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Vedd a legutóbbi 5 aláírt szerződésem, töltsd le őket, és készíts egy összevont Excel-szerű riportot a bennük szereplő összegekről!')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Multi-file pénzügyi extrakció&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Ha egy partner adataiban változás történik az ai_extract alapján (pld. új cím a PDF-ben), frissítsd a partner adatait a rendszerben is!')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Intelligens partner-adat frissítés&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Hasonlítsd össze a cégem összes élő szerződését: hol vannak a legnagyobb kockázatok a lejárati dátumok és a kifizetési határidők alapján?')"><span class="prompt-icon">🚀</span><span class="prompt-text">&ldquo;Globális kockázati elemzés&rdquo;</span></div>
          </div>
        </div>
 
        <!-- 6. Csapatkezelés -->
        <div class="prompt-cat">
          <div class="pc-header">👥 Csapat & Munkatársak</div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Listázd ki a munkatársaimat és mutasd meg kinek van aláírási joga')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Munkatársi lista & Jogkörök&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Vegyél fel egy új munkatársat: varga.janos@teszt.hu, adj neki szerkesztő jogkört és engedélyezd az aláírást!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Új munkatárs hozzáadása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Vond vissza kovacs.bela@teszt.hu minden hozzáférését, távolítsd el a fiókból!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Munkatárs eltávolítása&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Listázd ki azokat a munkatársakat, akik admin jogkörrel rendelkeznek!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Admin jogosultságok ellenőrzése&rdquo;</span></div>
            <div class="prompt-row" onclick="copyText('Módosítsd szabo.anna@teszt.hu jogkörét nézőre és vond meg az aláírási jogát!')"><span class="prompt-icon">▸</span><span class="prompt-text">&ldquo;Jogkör módosítása&rdquo;</span></div>
          </div>
        </div>
        
        <div class="prompt-cat" style="border-color: #f85149;">
          <div class="pc-header">🛡️ Audit & Kockázatelemzés <span class="pc-badge" style="background:#f85149">Expert</span></div>
          <div class="pc-body">
            <div class="prompt-row" onclick="copyText('Készíts nekem egy teljes szerződés-intelligencia riportot az Eszerződés.hu rendszeremből. Lépj végig az alábbi szekvencián:\n1. Adatgyűjtés: Kérd le az összes szerződést, a sablonlistát, az egyéni státuszokat és a lejáró szerződéseket (90 napon belül). Számold ki az összesítőket.\n2. KPI összefoglaló: Mutasd meg: összes szerződés száma, vár aláírásra, draft, aláírt, sablonok száma, egyedi státuszcímkék.\n3. Pipeline egészség: Aláírási ráta (aláírt / összes kiküldött), elakadási index (7, 14, 30 napos szintek).\n4. Sablon-káosz rangsor: Típus szerinti csoportosítás, duplikátumok, javaslat összevonásra/törlésre.\n5. Státusz audit: Státuszcímkék száma, elavult/teszt címkék aránya, kanban-oszlop audit.\n6. Kockázati mátrix: 0–100 skálán (aláírási sebesség, konzisztencia, lejárati lefedettség, státusz tisztaság, folyamat fegyelem). Legkritikusabb kockázat kiemelése.\n7. Top 3 azonnali teendő: Konkrét lépések.\nAz egész riportot strukturáltan, szekciónként tagolva add vissza, számokkal alátámasztva.')">
              <span class="prompt-icon">🔥</span>
              <span class="prompt-text" style="color:var(--blue); font-weight:600;">&ldquo;Eszerződés Intelligence Report &ndash; Teljes Audit&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Compliance Clock Audit-ot: térképezd fel az összes határozott idejű szerződésemet, és készíts egy idővonalat a 30, 60 és 90 napon belül lejáró tételekről. Prioritizáld őket érték vagy kockázat szerint (pl. ha egy fő beszállítói keretszerződés Q2-ben jár le).')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Compliance Clock Audit &ndash; A ketyegő bomba&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Liability Black Hole Audit-ot: keresd meg azokat a szerződéseket, ahol hiányzik a felelősségkorlátozás, a force majeure klauzula vagy a vitarendezési mechanizmus. Kifejezetten nézd át az utolsó 5 szerződésemet: van-e bennük korlátlan felelősségvállalás vagy hiányzó értékhatár?')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Liability Black Hole Audit &ndash; Menekülőutak&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Signatory Ghost Audit-ot: vizsgáld meg, hogy az aláírók szerepköre megfelel-e a szerződés értékének (pl. >5M Ft-nál junior írt-e alá). Válassz ki egy konkrét nagy értékű szerződést, elemezd az aláírót (akár külső Linkedin/weboldal adatokkal is), és vesd össze a szerződés tartalmával: tudatos delegálás vagy kockázat?')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Signatory Ghost Audit &ndash; Aláírók elemzése&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Relationship Temperature Audit-ot: nézd meg szerződésenként az utolsó interakció dátumát, a megújítások számát és az aláírási sebességet. Számolj ezekből egy &bdquo;kapcsolati hőmérsékletet&rdquo; (pl. ki a leghűségesebb partnered, ki ír alá leggyorsabban), és tegyél javaslatot keretszerződés kötésére a legforróbb kapcsolatoknál!')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Relationship Temperature Audit &ndash; Hideg vagy forró?&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Zombie Contract Audit-ot: keresd meg az aktív státuszú, de valójában elfeledett szerződéseket. Szűrd ki azokat, ahol az utolsó kapcsolódó esemény több mint 365 napja volt. Ezek zombik, amik torzítják a portfolióképet &ndash; tegyél javaslatot a lezárásukra vagy archiválásukra!')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Zombie Contract Audit &ndash; A halott, de élő szerződések&rdquo;</span>
            </div>
            <div class="prompt-row" onclick="copyText('Végezz egy Dead Weight Audit-ot: listázd ki az összes aláírásra váró szerződést, és csoportosítsd aszerint, hogy hány napja várnak. Külön emeld ki azokat, amelyek 14 napnál régebben vannak kiküldve, de senki nem írta alá. Adj összefoglalót arról, hogy hány szerződés elakadt és mióta!')">
              <span class="prompt-icon">▸</span>
              <span class="prompt-text">&ldquo;Dead Weight Audit &ndash; Elakadt aláírások&rdquo;</span>
            </div>
          </div>
        </div>
      </div>


    </div>

<!-- 🏗️ Iparági Munkafolyamatok -->
      <div class="sec-banner" id="workflows-banner" onclick="toggleSection('workflows')">
        <div class="sec-header">
          <span class="tc-icon">🏗️</span>
          <h2 class="sec-title">Iparági Munkafolyamat Kezdőkészletek</h2>
          <span class="sec-chevron" id="workflows-chevron">▶</span>
        </div>
      </div>

      <div class="sec-content" id="workflows-content" style="display: none;">
        <p class="sec-desc-inline">Válassz egyet, és az AI felépíti neked a komplett fázisokat, kikeresi a sablonokat és automatizálja a folyamatodat.</p>
        <div class="wf-grid">
        <!-- HR -->
        <div class="wf-card" onclick="copyText('Telepíts egy komplett HR folyamatot az alábbi státuszokkal és színekkel: 1. Jelölt jelentkezése (#8b949e), 2. Interjú / Kiválasztás (#f0883e), 3. Bér ajánlat kiküldve (#f0883e), 4. Munkaszerződés aláírása (#d29922), 5. IT & Eszköz Onboarding (#d29922), 6. Aktív / Állományban (#3fb950). Keress Munkaszerződés sablont és mutasd meg hogyan automatizálhatjuk az értesítéseket!')">
          <div class="wf-icon">👥</div>
          <h3 class="wf-title">HR & Toborzás</h3>
          <p class="wf-desc">A jelölt felkutatásától a teljes beléptetésig tartó automatizált lánc.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Jelölt jelentkezése</span>
            <span class="wf-step wf-s-2">Interjú / Kiválasztás</span>
            <span class="wf-step wf-s-3">Bér ajánlat kiküldve</span>
            <span class="wf-step wf-s-4">Munkaszerződés aláírása</span>
            <span class="wf-step wf-s-5">IT & Eszköz Onboarding</span>
            <span class="wf-step wf-s-6">Aktív / Állományban</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>

        <!-- Real Estate -->
        <div class="wf-card" onclick="copyText('Építs fel egy Ingatlan kiadási folyamatot az alábbi színekkel: 1. Új érdeklődő (#8b949e), 2. Helyszíni megtekintés (#f0883e), 3. Foglaló / Kaució (#f0883e), 4. Bérleti szerződés (#d29922), 5. Jegyzőkönyv & Kulcsátadás (#d29922), 6. Szerződés lezárva (#3fb950). Keress Lakásbérleti sablont és állíts be automata lejárati figyelőt!')">
          <div class="wf-icon">🏠</div>
          <h3 class="wf-title">Ingatlankezelés</h3>
          <p class="wf-desc">Bérleti szerződések és lakáskiadás teljes életciklusának menedzselése.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Új érdeklődő</span>
            <span class="wf-step wf-s-2">Helyszíni megtekintés</span>
            <span class="wf-step wf-s-3">Foglaló / Kaució</span>
            <span class="wf-step wf-s-4">Bérleti szerződés</span>
            <span class="wf-step wf-s-5">Jegyzőkönyv & Kulcsátadás</span>
            <span class="wf-step wf-s-6">Szerződés lezárva</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>

        <!-- Legal -->
        <div class="wf-card" onclick="copyText('Telepíts egy Jogi Approval láncot: 1. Tervezet (#8b949e), 2. Jogi osztály elolvasta (#f0883e), 3. Pénzügyi keret engedély (#f0883e), 4. Partner jognyilatkozatai (#d29922), 5. Ügyvezetői aláírás (#d29922), 6. Archivált / Auditált (#3fb950). Mutasd meg az elutasítások kezelését is!')">
          <div class="wf-icon">⚖️</div>
          <h3 class="wf-title">Jogi & Compliance</h3>
          <p class="wf-desc">Szigorú, többszintű jóváhagyási folyamatok és jogi ellenőrzési pontok.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Tervezet elkészítése</span>
            <span class="wf-step wf-s-2">Jogi osztály elolvasta</span>
            <span class="wf-step wf-s-3">Pénzügyi keret engedély</span>
            <span class="wf-step wf-s-4">Partner jognyilatkozatai</span>
            <span class="wf-step wf-s-5">Ügyvezetői aláírás</span>
            <span class="wf-step wf-s-6">Archivált / Auditált</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>

        <!-- Sales -->
        <div class="wf-card" onclick="copyText('Hozz létre egy Sales pipe-ot: 1. Beérkező érdeklődés (#8b949e), 2. Igényfelmérés & Demo (#f0883e), 3. Ártárgyalás (#f0883e), 4. Testreszabott árajánlat (#d29922), 5. Elektronikus aláírás (#d29922), 6. Megnyert üzlet 🎉 (#3fb950). Keress NDA sablont!')">
          <div class="wf-icon">💼</div>
          <h3 class="wf-title">Sales & CRM</h3>
          <p class="wf-desc">Értékesítési tölcsér összekötése az azonnali elektronikus szerződéskötéssel.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Beérkező érdeklődés</span>
            <span class="wf-step wf-s-2">Igényfelmérés & Demo</span>
            <span class="wf-step wf-s-3">Ártárgyalás</span>
            <span class="wf-step wf-s-4">Testreszabott árajánlat</span>
            <span class="wf-step wf-s-5">Elektronikus aláírás</span>
            <span class="wf-step wf-s-6">Megnyert üzlet 🎉</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>

        <!-- Finance -->
        <div class="wf-card" onclick="copyText('Építs fel egy Pénzügyi folyamatot: 1. Belső igény jelzése (#8b949e), 2. 3-ajánlatos versenyeztetés (#f0883e), 3. Szállító validálása (#f0883e), 4. Költséghelyi engedély (#d29922), 5. Keretszerződés kötése (#d29922), 6. Számlázott & Fizetve (#3fb950).')">
          <div class="wf-icon">💰</div>
          <h3 class="wf-title">Pénzügy & Beszerzés</h3>
          <p class="wf-desc">Vállalati beszerzések és kifizetési láncok transzparens nyomon követése.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Belső igény jelzése</span>
            <span class="wf-step wf-s-2">3-ajánlatos versenyeztetés</span>
            <span class="wf-step wf-s-3">Szállító validálása</span>
            <span class="wf-step wf-s-4">Költséghelyi engedély</span>
            <span class="wf-step wf-s-5">Keretszerződés kötése</span>
            <span class="wf-step wf-s-6">Számlázott & Fizetve</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>

        <!-- Logistics -->
        <div class="wf-card" onclick="copyText('Telepíts egy Logisztikai folyamatot: 1. Szállítási igény (#8b949e), 2. Kapacitás allokáció (#f0883e), 3. Szerződés & Fuvarlevél (#f0883e), 4. Folyamatban lévő út (#d29922), 5. Áruátvétel igazolása (#d29922), 6. Lezárt / Kiszámlázott (#3fb950).')">
          <div class="wf-icon">🚛</div>
          <h3 class="wf-title">Logisztika & Flotta</h3>
          <p class="wf-desc">Fuvarozási, szállítási és flottakezelési szerződések operatív lánca.</p>
          <div class="wf-steps">
            <span class="wf-step wf-s-1">Szállítási igény</span>
            <span class="wf-step wf-s-2">Kapacitás allokáció</span>
            <span class="wf-step wf-s-3">Szerződés & Fuvarlevél</span>
            <span class="wf-step wf-s-4">Folyamatban lévő út</span>
            <span class="wf-step wf-s-5">Áruátvétel igazolása</span>
            <span class="wf-step wf-s-6">Lezárt / Kiszámlázott</span>
          </div>
          <button class="wf-btn">🚀 Munkafolyamat Telepítése</button>
        </div>
      </div>


  </div>

  

  <footer>
    <p>&copy; 2025 Eszerződés.hu &mdash; <a href="https://www.eszerzodes.hu">www.eszerzodes.hu</a></p>
  </footer>
</div>

<script>
const basePath = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
const api = (path) => basePath + (path.startsWith('/') ? path.slice(1) : path);

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
const CHECK_ICON='<svg viewBox="0 0 16 16" width="14" height="14" style="flex-shrink:0"><path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>';
let toastTimer;

function showToast(){
  const t=document.getElementById('copy-toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2000);
}

function copyInstallCmd(btn) {
  const url = window.location.origin + api("/api/download-skills");
  const cmd = \`curl -sL "\${url}" -o /tmp/esz-skills.zip && unzip -qo /tmp/esz-skills.zip -d .claude/skills/ && rm /tmp/esz-skills.zip\`;
  navigator.clipboard.writeText(cmd).then(()=>{
    const old = btn.innerHTML;
    btn.classList.add('btn-success');
    btn.innerHTML = CHECK_ICON + ' Másolva!';
    showToast();
    setTimeout(()=>{
      btn.innerHTML = old;
      btn.classList.remove('btn-success');
    }, 2000);
  });
}

function toggleSection(sid, forceOpen) {
  const banner = document.getElementById(sid + '-banner');
  const content = document.getElementById(sid + '-content');
  const isOpen = banner.classList.contains('open');
  
  if (forceOpen) {
    banner.classList.add('open');
    content.style.display = 'block';
    return;
  }

  if (isOpen) {
    banner.classList.remove('open');
    content.style.display = 'none';
  } else {
    banner.classList.add('open');
    content.style.display = 'block';
  }
}

async function checkConnection(btn) {
  const result = document.getElementById('test-result');
  
  // Hostname check: The test endpoint is only for local instances
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    result.className = "test-result error";
    result.style.display = 'flex';
    result.innerHTML = '❌ <strong>Ez a funkció csak helyi futtatáskor működik.</strong> A felhő alapú relay szerver (api.eszerzodes.hu) biztonsági okokból nem támogatja a közvetlen token-ellenőrzést. Használd a lokálisan futó szervert a teszteléshez!';
    return;
  }

  const input = document.getElementById('test-api-key');
  const apiKey = input.value.trim();
  
  if (!apiKey) {
    result.className = "test-result error";
    result.innerHTML = '❌ Kérlek adj meg egy API kulcsot!';
    result.style.display = 'flex';
    return;
  }
  
  const oldText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⌛ Ellenőrzés...';
  result.style.display = 'none';
  result.style.flexDirection = 'row'; 
  result.style.alignItems = 'center';
  
  try {
    const res = await fetch(api('/api/check-token'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey })
    });
    
    const data = await res.json();
    
    if (data.success) {
      result.className = "test-result success";
      const s = data.subscription;
      result.style.flexDirection = 'column';
      result.style.alignItems = 'flex-start';
      
      let details = \`Csomag: <strong>\${s.package}</strong> (\${s.used}/\${s.limit} felhasznált) | Lejárat: <strong>\${s.expiry}</strong>\`;
      if (s.credits !== null) {
        details += \` | Egyenleg: <strong>\${s.credits} kredit</strong>\`;
      }
      
      result.innerHTML = \`<div style="display:flex; align-items:center; gap:0.5rem;">✅ <strong>Sikeres csatlakozás!</strong></div>
      <div style="margin-left:1.6rem; font-size:0.8rem; opacity:0.9;">
        \${details}
      </div>\`;
    } else {
      result.style.flexDirection = 'row';
      result.style.alignItems = 'center';
      result.className = "test-result error";
      result.innerHTML = \`❌ <strong>Hiba:</strong> \${data.error}\`;
    }
  } catch (err) {
  result.className = "test-result error";
  result.innerHTML = '❌ <strong>Hiba:</strong> Nem sikerült elérni az MCP szervert.';
} finally {
  btn.disabled = false;
  btn.innerHTML = oldText;
  result.style.display = 'flex';
}
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast());
}

function copyCode(btn) {
  const pre = btn.closest('.code-wrap').querySelector('code');
  const temp = pre.cloneNode(true);
  // Replace masked placeholders with real ones before copying
  temp.querySelectorAll('.token-placeholder').forEach(span => {
    if (span.hasAttribute('data-token')) {
      span.textContent = span.getAttribute('data-token');
    }
  });
  const text = temp.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = CHECK_ICON + ' Másolva!';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => { btn.innerHTML = COPY_ICON + ' Másolás'; btn.classList.remove('copied'); }, 2000);
  });
}

function copySkill(e, btn) {
  e.stopPropagation();
  const pre = btn.closest('.skill-card').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const old = btn.innerHTML;
    btn.classList.add('btn-success');
    btn.innerHTML = '✅ Másolva';
    showToast();
    setTimeout(() => {
      btn.innerHTML = old;
      btn.classList.remove('btn-success');
    }, 2000);
  });
}

function loadSkills() {
  const cont = document.getElementById('skills-container');
  if (!cont) return;

  cont.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.85rem">⌛ AI skillek betöltése...</div>';

  fetch(api('/api/skills')).then(r => {
    if (!r.ok) throw new Error('Hiba a skillek lekérésekor: ' + r.status);
    return r.json();
  }).then(skills => {
    cont.innerHTML = ''; // Clear loading

    if (skills.length === 0) {
      cont.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem">⚠️ Nem található betöltött skill a szerveren (ellenőrizd a .claude/skills mappát).</span>';
      return;
    }

    skills.forEach(skill => {
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
  }).catch(err => {
    cont.innerHTML = \`<span style="color:var(--red);font-size:0.85rem">❌ Hiba történt a skillek betöltésekor. (Részletek a konzolban)</span>\`;
    console.error("Nem sikerült lekérni a skilleket", err);
  });
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
  
  // Dynamic token replacement
  const tokenInput = document.getElementById('test-api-key');
  if (tokenInput) {
    tokenInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      document.querySelectorAll('.token-placeholder').forEach(el => {
        if (val) {
          el.setAttribute('data-token', val);
          // Only show dots, but keep the data-token for copying
          el.textContent = '••••••••••••••••'; 
        } else {
          el.removeAttribute('data-token');
          el.innerHTML = '&lt;TOKEN&gt;';
        }
      });
    });
  }
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
    btn.onclick=function(e){e.stopPropagation(); copyCode(this);};
    wrap.appendChild(btn);
    // Click anywhere on the box to copy
    wrap.onclick=function(){copyCode(this.querySelector('.copy-btn'));};
  });

  // Update hardcoded URLs to match current host
  const fullMcpUrl = window.location.origin + api('mcp');
  const fullDownloadUrl = window.location.origin + api('api/download-skills');
  
  document.querySelectorAll('code, pre, a, span, button').forEach(el => {
    if (el.children.length > 0 && el.tagName !== 'A') return;
    const original = el.innerHTML || el.textContent;
    if (typeof original !== 'string') return;
    
    if (original.includes('https://api.eszerzodes.hu/mcp/mcp')) {
      el.innerHTML = original.replace(/https:\/\/api\.eszerzodes\.hu\/mcp\/mcp/g, fullMcpUrl);
    }
    if (original.includes('https://api.eszerzodes.hu/mcp/api/download-skills')) {
      el.innerHTML = original.replace(/https:\/\/api\.eszerzodes\.hu\/mcp\/api\/download-skills/g, fullDownloadUrl);
    }
  });

  const mcpBtn = document.getElementById('copy-url-btn');
  if (mcpBtn) mcpBtn.onclick = () => copyText(fullMcpUrl);
});

function showConfigModal(){
  document.getElementById('config-modal').classList.add('active');
}
function closeModal(){
  document.getElementById('config-modal').classList.remove('active');
}
function switchModalTab(btn, id){
  const card = btn.closest('.modal-card');
  card.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  card.querySelectorAll('.modal-pane').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function showNodeModal(){
  document.getElementById('node-modal').classList.add('active');
}
function closeNodeModal(){
  document.getElementById('node-modal').classList.remove('active');
}
</script>`;
