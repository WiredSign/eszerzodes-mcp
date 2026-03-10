import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
/**
 * Wraps a tool execution to catch errors and format them for the AI.
 * This ensures that validation hints and 'action required' messages
 * are properly passed back to the model as a text response.
 */
export declare function wrapToolHandler(handler: () => Promise<any>): Promise<CallToolResult>;
//# sourceMappingURL=common.d.ts.map