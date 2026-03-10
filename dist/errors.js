"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.RateLimitError = exports.ValidationError = exports.NotFoundError = exports.AuthError = exports.EszerzodesError = void 0;
exports.createApiError = createApiError;
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
/**
 * Base error for all Eszerződés MCP errors.
 * Carries an MCP-compatible error code alongside the message.
 */
class EszerzodesError extends Error {
    code;
    httpStatus;
    constructor(message, code, httpStatus) {
        super(message);
        this.name = "EszerzodesError";
        this.code = code;
        this.httpStatus = httpStatus;
    }
}
exports.EszerzodesError = EszerzodesError;
/**
 * Authentication / authorization errors (missing token, invalid key, etc.)
 * Maps to HTTP 401 responses from the Eszerződés API.
 */
class AuthError extends EszerzodesError {
    constructor(message) {
        super(message, types_js_1.ErrorCode.InvalidRequest, 401);
        this.name = "AuthError";
    }
}
exports.AuthError = AuthError;
/**
 * The requested resource was not found.
 * Maps to HTTP 404 responses from the Eszerződés API.
 */
class NotFoundError extends EszerzodesError {
    constructor(message) {
        super(message, types_js_1.ErrorCode.InvalidRequest, 404);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Validation error – the request was malformed or missing required fields.
 * Maps to HTTP 422 responses from the Eszerződés API.
 */
class ValidationError extends EszerzodesError {
    validationErrors;
    constructor(message, validationErrors) {
        super(message, types_js_1.ErrorCode.InvalidParams, 422);
        this.name = "ValidationError";
        this.validationErrors = validationErrors;
    }
}
exports.ValidationError = ValidationError;
/**
 * Rate-limit or quota exceeded.
 * Maps to HTTP 429 responses from the Eszerződés API.
 */
class RateLimitError extends EszerzodesError {
    constructor(message) {
        super(message, types_js_1.ErrorCode.InvalidRequest, 429);
        this.name = "RateLimitError";
    }
}
exports.RateLimitError = RateLimitError;
/**
 * Forbidden – the user doesn't have permission for this action.
 * Maps to HTTP 403 responses from the Eszerződés API.
 */
class ForbiddenError extends EszerzodesError {
    constructor(message) {
        super(message, types_js_1.ErrorCode.InvalidRequest, 403);
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Maps an HTTP status code to the appropriate EszerzodesError subclass.
 */
function createApiError(status, body, path) {
    const prefix = `Eszerződés API error (${status}) [${path}]`;
    // Try to parse validation errors from the response body
    let validationErrors;
    try {
        const parsed = JSON.parse(body);
        let detailedMessage = "";
        if (parsed.errors && typeof parsed.errors === "object") {
            validationErrors = parsed.errors;
            detailedMessage = "\nValidation errors: " + JSON.stringify(validationErrors);
        }
        if (parsed.message && typeof parsed.message === "string") {
            body = parsed.message + detailedMessage;
        }
        else {
            // Fallback: If no message field, include the whole JSON string
            body = JSON.stringify(parsed);
        }
    }
    catch {
        // body is not JSON, use as-is
    }
    switch (status) {
        case 401:
            return new AuthError(`${prefix}: ${body}`);
        case 403:
            return new ForbiddenError(`${prefix}: ${body}`);
        case 404:
            return new NotFoundError(`${prefix}: ${body}`);
        case 422:
            return new ValidationError(`${prefix}: ${body}`, validationErrors);
        case 429:
            return new RateLimitError(`${prefix}: ${body}`);
        default:
            return new EszerzodesError(`${prefix}: ${body}`, status >= 500 ? types_js_1.ErrorCode.InternalError : types_js_1.ErrorCode.InvalidRequest, status);
    }
}
//# sourceMappingURL=errors.js.map