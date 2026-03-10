"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMcpServer = createMcpServer;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const api_client_js_1 = require("./api-client.js");
const index_js_1 = require("./tools/index.js");
const prompts_js_1 = require("./prompts.js");
function createMcpServer(eszerzodesToken) {
    const server = new mcp_js_1.McpServer({
        name: "eszerzodes-hu",
        version: "1.0.0",
    });
    const client = new api_client_js_1.EszerzodesClient(eszerzodesToken);
    (0, index_js_1.registerContractTools)(server, client);
    (0, index_js_1.registerPartyTools)(server, client);
    (0, index_js_1.registerTemplateTools)(server, client);
    (0, index_js_1.registerDocumentTools)(server, client);
    (0, index_js_1.registerThirdPartyTools)(server, client);
    (0, prompts_js_1.registerPrompts)(server);
    return server;
}
//# sourceMappingURL=mcp-server.js.map