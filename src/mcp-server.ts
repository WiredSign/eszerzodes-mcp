import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { EszerzodesClient } from "./api-client.js";
import {
  registerContractTools,
  registerPartyTools,
  registerTemplateTools,
  registerDocumentTools,
} from "./tools/index.js";
import { registerPrompts } from "./prompts.js";

export function createMcpServer(eszerzodesToken: string): McpServer {
  const server = new McpServer({
    name: "eszerzodes-hu",
    version: "1.0.0",
  });

  const client = new EszerzodesClient(eszerzodesToken);

  registerContractTools(server, client);
  registerPartyTools(server, client);
  registerTemplateTools(server, client);
  registerDocumentTools(server, client);
  registerPrompts(server);

  return server;
}
