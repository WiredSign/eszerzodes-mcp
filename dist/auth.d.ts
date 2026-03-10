/**
 * Validates an MCP API key and returns the corresponding Eszerződés.hu Bearer token.
 *
 * Auth strategies (in order of precedence):
 * 1. Environment variable map: MCP_KEY_<suffix> = eszerzodes_token
 * 2. Direct passthrough: the MCP key IS the Eszerződés.hu token (for dev/testing)
 */
export declare function validateMcpKey(authHeader: string | undefined): Promise<string>;
//# sourceMappingURL=auth.d.ts.map