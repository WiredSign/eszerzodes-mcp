"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMcpKey = validateMcpKey;
const errors_js_1 = require("./errors.js");
/**
 * Validates an MCP API key and returns the corresponding Eszerződés.hu Bearer token.
 *
 * Auth strategies (in order of precedence):
 * 1. Environment variable map: MCP_KEY_<suffix> = eszerzodes_token
 * 2. Direct passthrough: the MCP key IS the Eszerződés.hu token (for dev/testing)
 */
async function validateMcpKey(authHeader) {
    if (!authHeader) {
        throw new errors_js_1.AuthError("Missing Authorization header");
    }
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
        throw new errors_js_1.AuthError("Empty Bearer token");
    }
    // Strategy 1: If the key starts with ESZ_MCP_, look up the mapped token
    if (token.startsWith("ESZ_MCP_")) {
        const suffix = token.replace("ESZ_MCP_", "");
        const envKey = `MCP_KEY_${suffix}`;
        const mappedToken = process.env[envKey];
        if (mappedToken) {
            return mappedToken;
        }
        // Also check a general mapping env var (JSON map)
        const keyMap = process.env.MCP_KEY_MAP;
        if (keyMap) {
            try {
                const map = JSON.parse(keyMap);
                if (map[token]) {
                    return map[token];
                }
            }
            catch {
                // Invalid JSON in MCP_KEY_MAP, ignore
            }
        }
        throw new errors_js_1.AuthError("Invalid MCP API key");
    }
    // Strategy 2: Direct passthrough (the token itself is the Eszerződés.hu token)
    // Useful for development and testing
    return token;
}
//# sourceMappingURL=auth.js.map