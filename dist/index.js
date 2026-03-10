"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const mcp_server_js_1 = require("./mcp-server.js");
const auth_js_1 = require("./auth.js");
const api_client_js_1 = require("./api-client.js");
const landing_js_1 = require("./landing.js");
const errors_js_1 = require("./errors.js");
const adm_zip_1 = __importDefault(require("adm-zip"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Landing page
app.get("/", (_req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(landing_js_1.landingPageHtml);
});
// List and read skills endpoint
app.get("/api/skills", (_req, res) => {
    try {
        const skillsDir = path_1.default.join(__dirname, "..", ".claude", "skills");
        if (!fs_1.default.existsSync(skillsDir)) {
            return res.json([]);
        }
        const folders = fs_1.default.readdirSync(skillsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        const skills = folders.map(folder => {
            const skillPath = path_1.default.join(skillsDir, folder, "SKILL.md");
            let content = "";
            if (fs_1.default.existsSync(skillPath)) {
                content = fs_1.default.readFileSync(skillPath, "utf-8");
            }
            return {
                id: folder,
                content
            };
        });
        res.json(skills);
    }
    catch (err) {
        console.error("Failed to read skills", err);
        res.status(500).json({ error: "Failed to read skills" });
    }
});
// Download skills endpoint
app.get("/api/download-skills", (_req, res) => {
    try {
        const zip = new adm_zip_1.default();
        // Path to the .claude directory in the project root
        const claudeDir = path_1.default.join(__dirname, "..", ".claude");
        // Add the folder preserving the .claude folder structure but renamed
        zip.addLocalFolder(claudeDir, "Eszerzodes-AI-Plugin");
        const zipBuffer = zip.toBuffer();
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", 'attachment; filename="eszerzodes-claude-skills.zip"');
        res.send(zipBuffer);
    }
    catch (err) {
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
        if (!apiKey)
            return res.status(400).json({ error: "Missing API key" });
        // Validate if it's a mapped key or a direct token
        const token = await (0, auth_js_1.validateMcpKey)(`Bearer ${apiKey}`);
        const client = new api_client_js_1.EszerzodesClient(token);
        // Call a simple endpoint (templates list) to verify connectivity
        const templates = await client.get("/agent/templates");
        res.json({
            success: true,
            message: "API kapcsolat sikeres!",
            templateCount: templates?.data?.length || 0
        });
    }
    catch (error) {
        res.status(error.httpStatus || 401).json({
            success: false,
            error: error.message || "Érvénytelen API kulcs vagy hálózati hiba"
        });
    }
});
// MCP endpoint – stateless, every request creates a new MCP session
app.post("/mcp", async (req, res) => {
    try {
        const token = await (0, auth_js_1.validateMcpKey)(req.headers.authorization);
        const server = (0, mcp_server_js_1.createMcpServer)(token);
        const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
            sessionIdGenerator: undefined, // stateless
        });
        res.on("close", () => {
            transport.close().catch(() => { });
            server.close().catch(() => { });
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    }
    catch (error) {
        if (!res.headersSent) {
            // Determine HTTP status and JSON-RPC error code from error type
            let httpStatus = 500;
            let errorCode = -32603; // Internal error
            let message = "Internal server error";
            if (error instanceof errors_js_1.AuthError) {
                httpStatus = 401;
                errorCode = -32600; // Invalid request
                message = error.message;
            }
            else if (error instanceof errors_js_1.EszerzodesError) {
                httpStatus = error.httpStatus ?? 500;
                errorCode = error.code;
                message = error.message;
            }
            else if (error instanceof Error) {
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
            const token = await (0, auth_js_1.validateMcpKey)(`Bearer ${apiKey}`);
            const server = (0, mcp_server_js_1.createMcpServer)(token);
            const transport = new StdioServerTransport();
            await server.connect(transport);
            // Use console.error for logging in stdio mode so it doesn't interfere with the stdout communication
            console.error("Eszerződés MCP server successfully running on stdio");
        }
        catch (error) {
            console.error("Failed to start stdio server:", error);
            process.exit(1);
        }
    }
    runStdio().catch(console.error);
}
else {
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
//# sourceMappingURL=index.js.map