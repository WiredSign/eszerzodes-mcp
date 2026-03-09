import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EszerzodesClient } from "../api-client.js";

export function registerDocumentTools(
  server: McpServer,
  client: EszerzodesClient
) {
  // ── document_get_download_url ──────────────────────────────────────
  server.tool(
    "document_get_download_url",
    `Gets the download URL for a finalized contract's PDF document.

Use this when the user wants to download a contract document.
Only works for finalized contracts.
Returns the URL only — it does not download the file itself.

Returns a direct download URL for the contract PDF.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to get the download URL for"),
    },
    async (params) => {
      const downloadUrl = await client.getDownloadUrl(
        `/agent/contracts/${params.contract_id}/download`
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                status: "success",
                download_url: downloadUrl,
                note: "Use this URL to download the contract PDF. The URL requires authentication.",
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ── ai_extract ─────────────────────────────────────────────────────
  server.tool(
    "ai_extract",
    `Starts an AI-powered data extraction from a contract document.

Use this when the user wants to extract structured data from a contract
using a predefined schema.

Returns the extraction result or a result ID for async processing.`,
    {
      contract_id: z
        .number()
        .int()
        .describe("The contract ID to extract data from"),
      schema_key: z
        .string()
        .describe("The schema key that defines what data to extract"),
    },
    async (params) => {
      const result = await client.post("/agent/ai/extract", params);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
