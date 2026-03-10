"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapToolHandler = wrapToolHandler;
/**
 * Wraps a tool execution to catch errors and format them for the AI.
 * This ensures that validation hints and 'action required' messages
 * are properly passed back to the model as a text response.
 */
async function wrapToolHandler(handler) {
    try {
        const result = await handler();
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (error) {
        // If it's an EszerzodesError (or any error with a helpful message),
        // return it as a tool error with the message content.
        return {
            isError: true,
            content: [
                {
                    type: "text",
                    text: error.message || "An unexpected error occurred during the tool execution.",
                },
            ],
        };
    }
}
//# sourceMappingURL=common.js.map