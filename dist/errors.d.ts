import { ErrorCode } from "@modelcontextprotocol/sdk/types.js";
/**
 * Base error for all Eszerződés MCP errors.
 * Carries an MCP-compatible error code alongside the message.
 */
export declare class EszerzodesError extends Error {
    readonly code: ErrorCode;
    readonly httpStatus?: number;
    constructor(message: string, code: ErrorCode, httpStatus?: number);
}
/**
 * Authentication / authorization errors (missing token, invalid key, etc.)
 * Maps to HTTP 401 responses from the Eszerződés API.
 */
export declare class AuthError extends EszerzodesError {
    constructor(message: string);
}
/**
 * The requested resource was not found.
 * Maps to HTTP 404 responses from the Eszerződés API.
 */
export declare class NotFoundError extends EszerzodesError {
    constructor(message: string);
}
/**
 * Validation error – the request was malformed or missing required fields.
 * Maps to HTTP 422 responses from the Eszerződés API.
 */
export declare class ValidationError extends EszerzodesError {
    readonly validationErrors?: Record<string, string[]>;
    constructor(message: string, validationErrors?: Record<string, string[]>);
}
/**
 * Rate-limit or quota exceeded.
 * Maps to HTTP 429 responses from the Eszerződés API.
 */
export declare class RateLimitError extends EszerzodesError {
    constructor(message: string);
}
/**
 * Forbidden – the user doesn't have permission for this action.
 * Maps to HTTP 403 responses from the Eszerződés API.
 */
export declare class ForbiddenError extends EszerzodesError {
    constructor(message: string);
}
/**
 * Maps an HTTP status code to the appropriate EszerzodesError subclass.
 */
export declare function createApiError(status: number, body: string, path: string): EszerzodesError;
//# sourceMappingURL=errors.d.ts.map