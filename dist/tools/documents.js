"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDocumentTools = registerDocumentTools;
const zod_1 = require("zod");
function registerDocumentTools(server, client) {
    // ── document_get_download_url ──────────────────────────────────────
    server.tool("document_get_download_url", `Gets the download URL for a finalized contract's PDF document.

Use this when the user wants to download a contract document.
Only works for finalized contracts.
Returns the URL only — it does not download the file itself.

Returns a direct download URL for the contract PDF.`, {
        contract_id: zod_1.z
            .number()
            .int()
            .describe("The contract ID to get the download URL for"),
    }, async (params) => {
        const downloadUrl = await client.getDownloadUrl(`/agent/contracts/${params.contract_id}/download`);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        status: "success",
                        download_url: downloadUrl,
                        note: "Use this URL to download the contract PDF. The URL requires authentication.",
                    }, null, 2),
                },
            ],
        };
    });
    // ── ai_extract ─────────────────────────────────────────────────────
    server.tool("ai_extract", `Starts an AI-powered data extraction from a contract document.

Use this when the user wants to extract structured data from a contract
using a predefined schema.

Returns the extraction result or a result ID for async processing.`, {
        contract_id: zod_1.z
            .number()
            .int()
            .describe("The contract ID to extract data from"),
        schema_key: zod_1.z
            .string()
            .describe("The schema key that defines what data to extract"),
    }, async (params) => {
        const result = await client.post("/agent/ai/extract", params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });
}
//# sourceMappingURL=documents.js.map