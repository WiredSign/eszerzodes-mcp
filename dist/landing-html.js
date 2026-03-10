"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STYLES = void 0;
// GitHub repo-style landing page — assembled from parts
exports.STYLES = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0d1117;--bg-card:#161b22;--bg-hover:#1c2128;--border:#30363d;--border-active:#58a6ff;
  --text:#e6edf3;--text-muted:#8b949e;--text-subtle:#6e7681;
  --blue:#58a6ff;--green:#3fb950;--purple:#bc8cff;--orange:#d29922;--red:#f85149;--cyan:#39d353;
  --accent-gradient:linear-gradient(135deg,#58a6ff,#bc8cff);
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
code,pre,.mono{font-family:'JetBrains Mono',monospace}
button, a, .skill-header, .prompt-row, .repo-btn, .ai-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }

/* Repo header bar */
.repo-header{border-bottom:1px solid var(--border);background:var(--bg);position:sticky;top:0;z-index:50;backdrop-filter:blur(12px);background:rgba(13,17,23,.85)}
.repo-header-inner{max-width:1012px;margin:0 auto;padding:.75rem 1.5rem;display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.repo-owner{color:var(--blue);font-size:.95rem;font-weight:400;text-decoration:none}
.repo-owner:hover{text-decoration:underline}
.repo-sep{color:var(--text-muted);font-size:.95rem}
.repo-name{color:var(--blue);font-size:.95rem;font-weight:600;text-decoration:none}
.repo-name:hover{text-decoration:underline}
.repo-badge{font-size:.7rem;padding:.15rem .5rem;border:1px solid var(--border);border-radius:2rem;color:var(--text-muted);margin-left:.5rem;font-weight:500}
.repo-actions{margin-left:auto;display:flex;gap:.5rem;align-items:center}
.repo-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.3rem .75rem;border-radius:6px;font-size:.75rem;font-weight:500;border:1px solid var(--border);background:var(--bg-card);color:var(--text);cursor:pointer;transition:all .15s}
.repo-btn:hover{background:var(--bg-hover);border-color:var(--text-subtle)}
.repo-btn svg{width:16px;height:16px;fill:var(--text-muted)}
.repo-btn .count{padding-left:.35rem;border-left:1px solid var(--border);margin-left:.25rem;color:var(--text-muted)}

/* Tab nav */
.tab-nav{border-bottom:1px solid var(--border);background:var(--bg)}
.tab-nav-inner{max-width:1012px;margin:0 auto;padding:0 1.5rem;display:flex;gap:0;overflow-x:auto}
.tab-nav-item{display:inline-flex;align-items:center;gap:.4rem;padding:.65rem 1rem;font-size:.875rem;color:var(--text-muted);border-bottom:2px solid transparent;cursor:pointer;white-space:nowrap;transition:color .15s}
.tab-nav-item:hover{color:var(--text)}
.tab-nav-item.active{color:var(--text);border-bottom-color:var(--orange);font-weight:600}
.tab-nav-item svg{width:16px;height:16px;fill:currentColor}
.tab-nav-item .badge{background:var(--bg-hover);border:1px solid var(--border);padding:.05rem .5rem;border-radius:2rem;font-size:.7rem;margin-left:.15rem}

/* Main container */
.container{max-width:1012px;margin:0 auto;padding:1.5rem}

/* About sidebar style info box */
.about-box{border:1px solid var(--border);border-radius:6px;padding:1rem 1.25rem;margin-bottom:1rem;background:var(--bg-card)}
.about-box h3{font-size:.875rem;font-weight:600;margin-bottom:.5rem;display:flex;align-items:center;gap:.4rem}
.about-desc{color:var(--text-muted);font-size:.875rem;line-height:1.6;margin-bottom:.75rem}
.about-link{color:var(--blue);text-decoration:none;font-size:.85rem;display:flex;align-items:center;gap:.35rem}
.about-link:hover{text-decoration:underline}
.about-topics{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.75rem}
.topic-tag{background:rgba(56,139,253,.15);color:var(--blue);padding:.2rem .65rem;border-radius:2rem;font-size:.75rem;font-weight:500;cursor:default;transition:background .15s}
.topic-tag:hover{background:rgba(56,139,253,.25)}

/* Stats bar */
.stats-bar{display:flex;gap:1rem;flex-wrap:wrap;padding:.5rem 0;margin-bottom:1rem;font-size:.8rem;color:var(--text-muted)}
.stat-item{display:flex;align-items:center;gap:.35rem}
.stat-dot{width:12px;height:12px;border-radius:50%}
.stat-item svg{width:16px;height:16px;fill:var(--text-muted)}

/* File browser */
.file-browser{border:1px solid var(--border);border-radius:6px;overflow:hidden;margin-bottom:1.5rem}
.file-header{padding:.6rem 1rem;background:var(--bg-card);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.75rem;font-size:.85rem}
.file-header .avatar{width:24px;height:24px;border-radius:50%;background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:#fff;flex-shrink:0}
.file-header .msg{color:var(--text-muted);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.file-header .time{color:var(--text-subtle);white-space:nowrap;font-size:.8rem}
.file-row{display:flex;align-items:center;padding:.45rem 1rem;border-bottom:1px solid var(--border);font-size:.85rem;transition:background .1s;cursor:default}
.file-row:last-child{border-bottom:none}
.file-row:hover{background:var(--bg-hover)}
.file-row svg{width:16px;height:16px;fill:var(--text-muted);margin-right:.6rem;flex-shrink:0}
.file-row .fname{color:var(--blue);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.file-row .fmsg{color:var(--text-muted);margin-left:1rem;flex:2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
.file-row .ftime{color:var(--text-subtle);margin-left:1rem;white-space:nowrap;font-size:.8rem;min-width:80px;text-align:right}

/* README-style content */
.readme-card{border:1px solid var(--border);border-radius:6px;overflow:hidden}
.readme-header{padding:.6rem 1rem;background:var(--bg-card);border-bottom:1px solid var(--border);font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:.5rem}
.readme-header svg{width:16px;height:16px;fill:var(--text-muted)}
.readme-body{padding:1.5rem 2rem}
.readme-body h1{font-size:1.75rem;font-weight:700;padding-bottom:.5rem;border-bottom:1px solid var(--border);margin-bottom:1rem}
.readme-body h2{font-size:1.25rem;font-weight:600;padding-bottom:.35rem;border-bottom:1px solid var(--border);margin:1.5rem 0 .75rem}
.readme-body h3{font-size:1rem;font-weight:600;margin:1rem 0 .5rem}
.readme-body p{color:var(--text-muted);line-height:1.7;margin-bottom:.75rem;font-size:.9rem}
.readme-body a{color:var(--blue);text-decoration:none}
.readme-body a:hover{text-decoration:underline}

/* Status indicator */
.status-live{display:inline-flex;align-items:center;gap:.4rem;background:rgba(63,185,80,.12);border:1px solid rgba(63,185,80,.3);padding:.35rem .85rem;border-radius:2rem;font-size:.8rem;color:var(--green);font-weight:500;margin:.75rem 0 1rem}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(63,185,80,.4)}50%{opacity:.7;box-shadow:0 0 0 6px rgba(63,185,80,0)}}

/* Endpoint table */
.endpoint-table{width:100%;border-collapse:collapse;margin:.75rem 0}
.endpoint-table td{padding:.45rem .5rem;font-size:.85rem;border-top:1px solid var(--border)}
.method-badge{font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;padding:.15rem .45rem;border-radius:4px;display:inline-block}
.method-badge.post{background:rgba(63,185,80,.15);color:var(--green)}
.method-badge.get{background:rgba(88,166,255,.15);color:var(--blue)}
.ep-path{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--text)}
.ep-desc{color:var(--text-muted);font-size:.8rem}

/* Code blocks */
.code-wrap{position:relative}
.code-wrap:hover .copy-btn{opacity:1}
.code-block{background:#0d1117;border:1px solid var(--border);border-radius:6px;padding:.85rem 1rem;overflow-x:auto;margin:.5rem 0;font-size:.8rem;line-height:1.65;color:var(--text)}
.code-block .kw{color:var(--red)}
.code-block .str{color:var(--blue)}
.code-block .cmt{color:var(--text-subtle)}
.inline-code{background:rgba(110,118,129,.25);padding:.15rem .4rem;border-radius:4px;font-size:.8rem;font-family:'JetBrains Mono',monospace}

/* Copy button */
.copy-btn{position:absolute;top:.45rem;right:.45rem;padding:.3rem .55rem;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-muted);cursor:pointer;font-size:.7rem;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:.3rem;opacity:0;transition:all .15s;z-index:2}
.copy-btn:hover{background:var(--bg-hover);border-color:var(--text-subtle);color:var(--text)}
.copy-btn.copied{border-color:var(--green);color:var(--green)}
.copy-btn svg{width:14px;height:14px;fill:currentColor}

/* Button click feedback scale effect */
.btn-success {
  transform: scale(0.95);
  background: rgba(63, 185, 80, 0.1) !important;
  border-color: var(--green) !important;
  color: var(--green) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.4rem !important;
}
.btn-success svg { 
  width: 14px !important; 
  height: 14px !important; 
  flex-shrink: 0;
  fill: var(--green) !important; 
}

/* Toast notification */
.toast{position:fixed;top:1rem;left:50%;transform:translateX(-50%) translateY(-150%);background:var(--bg-card);border:1px solid var(--green);color:var(--green);padding:.5rem 1.25rem;border-radius:8px;font-size:.85rem;font-weight:500;display:flex;align-items:center;gap:.4rem;z-index:1000;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s;opacity:0;visibility:hidden}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;visibility:visible}
.toast svg{width:16px;height:16px;fill:var(--green)}

/* Tool cards grid */
.tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.6rem;margin:.75rem 0}
.tool-card{border:1px solid var(--border);border-radius:6px;background:var(--bg-card);transition:border-color .15s;overflow:hidden}
.tool-card:hover{border-color:var(--text-subtle)}
.tool-card .tc-header{display:flex;align-items:center;gap:.4rem;padding:.75rem;cursor:pointer;user-select:none}
.tool-card .tc-icon{font-size:1rem}
.tool-card .tc-title{font-size:.85rem;font-weight:600}
.tool-card .tc-count{margin-left:auto;background:rgba(88,166,255,.15);color:var(--blue);padding:.1rem .45rem;border-radius:2rem;font-size:.7rem;font-weight:600}
.tool-card .tc-chevron{color:var(--text-subtle);transition:transform .2s;font-size:.7rem;margin-left:.3rem}
.tool-card.open .tc-chevron{transform:rotate(90deg)}
.tool-card .tc-desc{font-size:.75rem;color:var(--text-muted);line-height:1.4;padding:0 .75rem .5rem}
.tool-card .tc-tools{display:none;border-top:1px solid var(--border)}
.tool-card.open .tc-tools{display:block}
.tc-tool-row{display:flex;align-items:center;gap:.5rem;padding:.35rem .75rem;font-size:.78rem;border-bottom:1px solid rgba(48,54,61,.5);transition:background .1s}
.tc-tool-row:last-child{border-bottom:none}
.tc-tool-row:hover{background:var(--bg-hover)}
.tc-tool-row .tool-name{font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--blue);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tc-tool-row .tool-label{color:var(--text-muted);font-size:.72rem;flex:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* Toggle switch */
.toggle{position:relative;width:32px;height:18px;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0}
.toggle .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:var(--border);border-radius:18px;transition:.2s}
.toggle .slider:before{position:absolute;content:'';height:14px;width:14px;left:2px;bottom:2px;background:var(--text-subtle);border-radius:50%;transition:.2s}
.toggle input:checked+.slider{background:var(--green)}
.toggle input:checked+.slider:before{transform:translateX(14px);background:#fff}
.tool-card .tc-select-all{display:flex;align-items:center;gap:.5rem;padding:.4rem .75rem;border-bottom:1px solid var(--border);font-size:.72rem;color:var(--text-muted)}
.tool-card .tc-select-all>label:first-child{cursor:pointer;flex:1}
.tool-card .tc-select-all>.toggle{flex-shrink:0}

/* AI selector pills */
.ai-pills{display:flex;flex-wrap:wrap;gap:.4rem;margin:.5rem 0}
.ai-pill{display:inline-flex;align-items:center;gap:.3rem;padding:.35rem .7rem;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:.8rem;cursor:pointer;transition:all .15s;font-family:'Inter',sans-serif}
.ai-pill:hover{border-color:var(--text-subtle);color:var(--text);background:var(--bg-hover)}
.ai-pill.active{border-color:var(--blue);color:var(--text);background:rgba(88,166,255,.1)}
.ai-pill .dot{width:8px;height:8px;border-radius:50%;background:var(--ai-c,var(--blue))}
.ai-config{display:none;margin-top:.5rem}
.ai-config.active{display:block}

/* Option toggle */
.opt-toggle{display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden;margin:.75rem 0}
.opt-btn{flex:1;padding:.6rem;text-align:center;font-size:.85rem;font-weight:500;cursor:pointer;background:transparent;border:none;color:var(--text-muted);transition:all .15s;font-family:'Inter',sans-serif;border-right:1px solid var(--border)}
.opt-btn:last-child{border-right:none}
.opt-btn:hover{color:var(--text);background:var(--bg-hover)}
.opt-btn.active{color:var(--text);background:var(--bg-card)}
.opt-panel{display:none}
.opt-panel.active{display:block}

/* Example prompts */
.prompt-row{display:flex;align-items:center;gap:.6rem;padding:.5rem .75rem;border-radius:6px;font-size:.85rem;transition:background .15s;cursor:pointer}
.prompt-row:hover{background:var(--bg-hover)}
.prompt-icon{color:var(--text-subtle);flex-shrink:0}
.prompt-text{color:var(--text-muted);font-style:italic;flex:1}
.prompt-copy{color:var(--text-subtle);font-size:.7rem;opacity:0;transition:opacity .15s;display:flex;align-items:center;gap:.25rem}
.prompt-copy svg{width:14px;height:14px;fill:currentColor}
.prompt-row:hover .prompt-copy{opacity:1}

/* Footer */
footer{text-align:center;padding:2rem 0 1rem;color:var(--text-subtle);font-size:.8rem;border-top:1px solid var(--border);margin-top:2rem}
footer a{color:var(--blue);text-decoration:none}
footer a:hover{text-decoration:underline}

/* Tab system */
.deploy-tabs{display:flex;gap:0;margin-bottom:-1px}
.deploy-tab{padding:.4rem .85rem;font-size:.8rem;border:1px solid var(--border);background:transparent;color:var(--text-muted);cursor:pointer;transition:all .15s;font-family:'Inter',sans-serif;border-bottom:none;border-radius:6px 6px 0 0;margin-right:-1px}
.deploy-tab.active{background:var(--bg);color:var(--text);border-bottom:1px solid var(--bg);position:relative;z-index:1}
.deploy-content{display:none}
.deploy-content.active{display:block}

/* Skill Cards */
#skills-container{display:flex;flex-direction:column;gap:1rem;margin-top:1rem}
.skill-card{border:1px solid var(--border);border-radius:8px;background:var(--bg-card);overflow:hidden}
.skill-header{display:flex;justify-content:space-between;align-items:center;padding:.85rem 1.2rem;cursor:pointer;background:var(--bg);border-bottom:1px solid transparent;user-select:none;transition:background .2s}
.skill-header:hover{background:var(--bg-hover)}
.skill-title{font-weight:600;display:flex;align-items:center;gap:.5rem;color:var(--text)}
.skill-title .tc-chevron{color:var(--text-subtle);font-size:.75rem;transition:transform .2s}
.skill-actions{display:flex;align-items:center;gap:.75rem}
.skill-copy-btn{background:var(--bg-hover);border:1px solid var(--border);color:var(--text);padding:.35rem .75rem;border-radius:6px;font-size:.75rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:.3rem}
.skill-copy-btn:hover{background:var(--border);color:white}
.skill-content{padding:1.2rem;font-size:.85rem;color:var(--text-muted);display:none;background:var(--bg-card);border-top:1px solid var(--border)}
.skill-content pre{background:var(--bg);padding:1rem;border-radius:6px;border:1px solid var(--border);overflow-x:auto;margin:.75rem 0;color:var(--text)}
.skill-content code{font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace}
.skill-card.expanded .skill-content{display:block}
.skill-card.expanded .tc-chevron{transform:rotate(90deg)}
.skill-card.expanded .skill-header{border-bottom-color:var(--border);background:var(--bg-hover)}

/* AI Quick Prompt Banner */
.ai-banner{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1.5rem;margin:1.5rem 0 0;display:flex;flex-direction:column;align-items:center;gap:1.2rem;text-align:center;}
.ai-banner-text{font-size:1rem;color:var(--text);font-weight:500;line-height:1.4;max-width:80%;}
.ai-btn-group{display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;}
.ai-btn{display:inline-flex;align-items:center;gap:0.4rem;padding:0.6rem 1.25rem;background:var(--bg);border:1px solid var(--border);border-radius:2rem;color:var(--text);text-decoration:none;font-size:0.875rem;font-weight:500;transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;}
.ai-btn:hover{background:var(--bg-hover);border-color:var(--text);transform:scale(1.03);}

/* API Test Box */
.test-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.test-input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
.test-input {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}
.test-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
}
.test-btn {
  background: var(--bg-hover);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  white-space: nowrap;
}
.test-btn:hover { background: var(--border); }
.test-result {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  display: none;
  align-items: center;
  gap: 0.5rem;
}
.test-result.success {
  display: flex;
  background: rgba(63, 185, 80, 0.1);
  border: 1px solid rgba(63, 185, 80, 0.3);
  color: var(--green);
}
.test-result.error {
  display: flex;
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.3);
  color: var(--red);
}

@media(max-width:768px){
  .test-input-group { flex-direction: column; }
}
@media(max-width:768px){
  .repo-actions{display:none}
  .file-row .fmsg{display:none}
  .readme-body{padding:1rem}
  .tool-grid{grid-template-columns:1fr}
  .about-topics{gap:.3rem}
}
</style>`;
//# sourceMappingURL=landing-html.js.map