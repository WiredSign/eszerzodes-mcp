import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Wraps a tool execution to catch errors and format them for the AI.
 * This ensures that validation hints and 'action required' messages
 * are properly passed back to the model as a text response.
 */
export async function wrapToolHandler(
    handler: () => Promise<any>
): Promise<CallToolResult> {
    try {
        const result = await handler();
        return {
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
        };
    } catch (error: any) {
        // If it's an EszerzodesError (or any error with a helpful message),
        // return it as a tool error with the message content.
        return {
            isError: true,
            content: [
                {
                    type: "text" as const,
                    text: error.message || "An unexpected error occurred during the tool execution.",
                },
            ],
        };
    }
}
