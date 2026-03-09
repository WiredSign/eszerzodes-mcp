import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./mcp-server.js";
import { validateMcpKey } from "./auth.js";
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

    // Add the folder preserving the .claude folder structure
    zip.addLocalFolder(claudeDir, ".claude");

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

// MCP endpoint – stateless, every request creates a new MCP session
app.post("/mcp", async (req, res) => {
  try {
    const token = await validateMcpKey(req.headers.authorization);
    const server = createMcpServer(token);

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless
    });

    res.on("close", () => {
      transport.close().catch(() => { });
      server.close().catch(() => { });
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error: unknown) {
    if (!res.headersSent) {
      // Determine HTTP status and JSON-RPC error code from error type
      let httpStatus = 500;
      let errorCode = -32603; // Internal error
      let message = "Internal server error";

      if (error instanceof AuthError) {
        httpStatus = 401;
        errorCode = -32600; // Invalid request
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

// Handle GET and DELETE for MCP protocol (session management)
app.get("/mcp", (_req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "SSE transport not supported. Use POST for stateless operation." },
    id: null,
  });
});

app.delete("/mcp", (_req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Session termination not needed for stateless transport." },
    id: null,
  });
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
