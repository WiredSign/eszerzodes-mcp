import { AuthError } from "./errors.js";

/**
 * Validates an MCP API key and returns the corresponding Eszerződés.hu Bearer token.
 *
 * Auth strategies (in order of precedence):
 * 1. Environment variable map: MCP_KEY_<suffix> = eszerzodes_token
 * 2. Direct passthrough: the MCP key IS the Eszerződés.hu token (for dev/testing)
 */
export async function validateMcpKey(authHeader: string | undefined): Promise<string> {
  if (!authHeader) {
    throw new AuthError("Missing Authorization header");
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new AuthError("Empty Bearer token");
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
        const map = JSON.parse(keyMap) as Record<string, string>;
        if (map[token]) {
          return map[token];
        }
      } catch {
        // Invalid JSON in MCP_KEY_MAP, ignore
      }
    }

    throw new AuthError("Invalid MCP API key");
  }

  // Strategy 2: Direct passthrough (the token itself is the Eszerződés.hu token)
  // Useful for development and testing
  return token;
}

