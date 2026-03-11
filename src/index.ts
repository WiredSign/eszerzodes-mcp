import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./mcp-server.js";
import { validateMcpKey } from "./auth.js";
import { EszerzodesClient } from "./api-client.js";
import { landingPageHtml } from "./landing.js";
import { EszerzodesError, AuthError } from "./errors.js";
import AdmZip from "adm-zip";
import path from "path";

import fs from "fs";

const app = express();
app.use(express.json());

// Landing page
app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(landingPageHtml);
});

// List and read skills endpoint
app.get("/api/skills", (_req, res) => {
  try {
    const skillsDir = path.join(__dirname, "..", ".claude", "skills");
    if (!fs.existsSync(skillsDir)) {
      return res.json([]);
    }
    const folders = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const skills = folders.map(folder => {
      const skillPath = path.join(skillsDir, folder, "SKILL.md");
      let content = "";
      if (fs.existsSync(skillPath)) {
        content = fs.readFileSync(skillPath, "utf-8");
      }
      return {
        id: folder,
        content
      };
    });

    res.json(skills);
  } catch (err) {
    console.error("Failed to read skills", err);
    res.status(500).json({ error: "Failed to read skills" });
  }
});

// Download skills endpoint
app.get("/api/download-skills", (_req, res) => {
  try {
    const zip = new AdmZip();
    // Path to the .claude directory in the project root
    const claudeDir = path.join(__dirname, "..", ".claude");

    // Add the folder preserving the .claude folder structure but renamed
    zip.addLocalFolder(claudeDir, "Eszerzodes-AI-Plugin");

    const zipBuffer = zip.toBuffer();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="eszerzodes-claude-skills.zip"');
    res.send(zipBuffer);
  } catch (err) {
    console.error("Failed to generate zip", err);
    res.status(500).json({ error: "Failed to generate zip file." });
  }
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "eszerzodes-mcp", version: "1.0.0" });
});

// Direct token check endpoint for the landing page
app.post("/api/check-token", async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey) return res.status(400).json({ error: "Missing API key" });

    // Validate if it's a mapped key or a direct token
    const token = await validateMcpKey(`Bearer ${apiKey}`);
    const client = new EszerzodesClient(token);

    // Call user-info to get subscription details
    const userInfo: any = await client.get("/agent/user-info");
    // Support both root-level and { data: ... } responses
    const d = userInfo?.data || userInfo || {};

    const subInfo = {
      package: d.membership || d.membership_name || "Nincs aktív csomag",
      limit: d.total_capacity || 0,
      used: d.used_capacity || 0,
      expiry: d.membership_ends_at || d.membership_expires_at || "nincs megadva",
      credits: d.credit !== undefined ? d.credit : (d.credits !== undefined ? d.credits : null)
    };

    res.json({
      success: true,
      message: "API kapcsolat sikeres!",
      subscription: subInfo
    });
  } catch (error: any) {
    res.status(error.httpStatus || 401).json({
      success: false,
      error: error.message || "Érvénytelen API kulcs vagy hálózati hiba"
    });
  }
});

// Session-based transport management
const transports = new Map<string, any>();

// Helper to clean up transports
const cleanupTransport = (sessionId: string) => {
  const t = transports.get(sessionId);
  if (t) {
    try {
      t.close().catch(() => { });
    } catch (e) { }
    transports.delete(sessionId);
  }
};

// MCP endpoint – Supports both stateless and stateful (Streamable HTTP) operation
app.all("/mcp", async (req, res) => {
  try {
    const sessionId = req.headers["mcp-session-id"] as string || req.query.sessionId as string;
    let transport: any;

    if (sessionId && transports.has(sessionId)) {
      transport = transports.get(sessionId);
    } else if (req.method === "POST") {
      // If it's an initialization request or we don't have a session, create one
      // (or handle it statelessly if desired, but stateful is better for SSE compatibility)
      const token = await validateMcpKey(req.headers.authorization);
      const server = createMcpServer(token);

      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => transport.sessionId || Math.random().toString(36).substring(2, 15),
        onsessioninitialized: (id) => {
          transports.set(id, transport);
        }
      });

      res.on("close", () => {
        // Only cleanup if it's not a persistent SSE session or if manually closed
        // For stateless operation, we might want to cleanup immediately
      });

      await server.connect(transport);
    } else if (req.method === "GET") {
      // Direct GET without session is likely an attempt to establish SSE
      // In StreamableHTTP, the client should have POSTed first to get a session ID
      // But some clients might try GET directly if they follow old SSE patterns.
      res.status(405).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Use POST to initialize MCP session first." },
        id: null,
      });
      return;
    } else {
      res.status(405).send("Method Not Allowed");
      return;
    }

    if (transport) {
      await transport.handleRequest(req, res, req.body);
    }
  } catch (error: unknown) {
    console.error("MCP Error:", error);
    if (!res.headersSent) {
      let httpStatus = 500;
      let errorCode = -32603;
      let message = "Internal server error";

      if (error instanceof AuthError) {
        httpStatus = 401;
        errorCode = -32600;
        message = error.message;
      } else if (error instanceof EszerzodesError) {
        httpStatus = error.httpStatus ?? 500;
        errorCode = error.code;
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      res.status(httpStatus).json({
        jsonrpc: "2.0",
        error: { code: errorCode, message },
        id: null,
      });
    }
  }
});

// Explicitly support deprecated SSE transport for tools like 'mcp-remote'
app.get("/sse", async (req, res) => {
  try {
    const { SSEServerTransport } = await import("@modelcontextprotocol/sdk/server/sse.js");
    const token = await validateMcpKey(req.headers.authorization || (req.query.token as string));
    const server = createMcpServer(token);
    
    const transport = new SSEServerTransport("/messages", res);
    transports.set(transport.sessionId, transport);
    
    res.on("close", () => {
      transports.delete(transport.sessionId);
    });

    await server.connect(transport);
  } catch (error) {
    console.error("SSE Error:", error);
    if (!res.headersSent) res.status(500).send("Internal Server Error");
  }
});

app.post("/messages", async (req, res) => {
  try {
    const sessionId = req.query.sessionId as string;
    const transport = transports.get(sessionId);
    if (transport && typeof transport.handlePostMessage === "function") {
      await transport.handlePostMessage(req, res, req.body);
    } else {
      res.status(400).send("Invalid session ID or transport type");
    }
  } catch (error) {
    console.error("Messages Error:", error);
    if (!res.headersSent) res.status(500).send("Internal Server Error");
  }
});

const useStdio = process.argv.includes("--stdio");

if (useStdio) {
  // Stdio mode for Claude Desktop and other local clients
  async function runStdio() {
    const { StdioServerTransport } = await import("@modelcontextprotocol/sdk/server/stdio.js");

    // In stdio mode, we need the API key from environment variables
    const apiKey = process.env.ESZERZODES_API_KEY || process.env.MCP_API_KEY;

    if (!apiKey) {
      console.error("Error: ESZERZODES_API_KEY or MCP_API_KEY environment variable is required for stdio mode.");
      console.error("Example: ESZERZODES_API_KEY=your_token node dist/index.js --stdio");
      process.exit(1);
    }

    try {
      // Validate the key just like in HTTP mode
      const token = await validateMcpKey(`Bearer ${apiKey}`);
      const server = createMcpServer(token);
      const transport = new StdioServerTransport();

      await server.connect(transport);
      // Use console.error for logging in stdio mode so it doesn't interfere with the stdout communication
      console.error("Eszerződés MCP server successfully running on stdio");
    } catch (error) {
      console.error("Failed to start stdio server:", error);
      process.exit(1);
    }
  }

  runStdio().catch(console.error);
} else {
  // HTTP server mode
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.listen(PORT, () => {
    console.log(`Eszerződés MCP server running on port ${PORT}`);
    console.log(`  POST /mcp    - MCP endpoint`);
    console.log(`  GET  /health - Health check`);
    console.log(`\n💡 To run in stdio mode (for Claude Desktop), add the --stdio flag:`);
    console.log(`   npm start -- --stdio`);
  });
}
