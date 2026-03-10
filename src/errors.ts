import { ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Base error for all Eszerződés MCP errors.
 * Carries an MCP-compatible error code alongside the message.
 */
export class EszerzodesError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus?: number;

  constructor(message: string, code: ErrorCode, httpStatus?: number) {
    super(message);
    this.name = "EszerzodesError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

/**
 * Authentication / authorization errors (missing token, invalid key, etc.)
 * Maps to HTTP 401 responses from the Eszerződés API.
 */
export class AuthError extends EszerzodesError {
  constructor(message: string) {
    super(message, ErrorCode.InvalidRequest, 401);
    this.name = "AuthError";
  }
}

/**
 * The requested resource was not found.
 * Maps to HTTP 404 responses from the Eszerződés API.
 */
export class NotFoundError extends EszerzodesError {
  constructor(message: string) {
    super(message, ErrorCode.InvalidRequest, 404);
    this.name = "NotFoundError";
  }
}

/**
 * Validation error – the request was malformed or missing required fields.
 * Maps to HTTP 422 responses from the Eszerződés API.
 */
export class ValidationError extends EszerzodesError {
  public readonly validationErrors?: Record<string, string[]>;

  constructor(message: string, validationErrors?: Record<string, string[]>) {
    super(message, ErrorCode.InvalidParams, 422);
    this.name = "ValidationError";
    this.validationErrors = validationErrors;
  }
}

/**
 * Rate-limit or quota exceeded.
 * Maps to HTTP 429 responses from the Eszerződés API.
 */
export class RateLimitError extends EszerzodesError {
  constructor(message: string) {
    super(message, ErrorCode.InvalidRequest, 429);
    this.name = "RateLimitError";
  }
}

/**
 * Forbidden – the user doesn't have permission for this action.
 * Maps to HTTP 403 responses from the Eszerződés API.
 */
export class ForbiddenError extends EszerzodesError {
  constructor(message: string) {
    super(message, ErrorCode.InvalidRequest, 403);
    this.name = "ForbiddenError";
  }
}

/**
 * Maps an HTTP status code to the appropriate EszerzodesError subclass.
 */
export function createApiError(
  status: number,
  body: string,
  path: string
): EszerzodesError {
  const prefix = `Eszerződés API error (${status}) [${path}]`;

  // Try to parse validation errors from the response body
  let validationErrors: Record<string, string[]> | undefined;
  try {
    const parsed = JSON.parse(body);
    let detailedMessage = "";

    if (parsed.errors && typeof parsed.errors === "object") {
      validationErrors = parsed.errors as Record<string, string[]>;
      detailedMessage = "\nValidation errors: " + JSON.stringify(validationErrors);
    }

    if (parsed.message && typeof parsed.message === "string") {
      body = parsed.message + detailedMessage;
    } else {
      // Fallback: If no message field, include the whole JSON string
      body = JSON.stringify(parsed);
    }
  } catch {
    // body is not JSON, use as-is
  }

  switch (status) {
    case 401:
      return new AuthError(`${prefix}: ${body}`);
    case 403:
      return new ForbiddenError(`${prefix}: ${body}`);
    case 404:
      return new NotFoundError(`${prefix}: ${body}`);
    case 400:
    case 422: {
      const missingFields = validationErrors ? Object.keys(validationErrors).join(", ") : "";
      const promptHint = missingFields
        ? `\n\n[VISSZAKÉRDEZÉS SZÜKSÉGES / ACTION REQUIRED]: A művelet folytatásához hiányoznak a következő adatok: ${missingFields}. Kérlek, kérdezd meg ezeket a felhasználótól, majd próbáld meg újra a műveletet a kapott adatokkal!`
        : "";
      return new ValidationError(`${prefix}: ${body}${promptHint}`, validationErrors);
    }
    case 429:
      return new RateLimitError(`${prefix}: ${body}`);
    default:
      return new EszerzodesError(
        `${prefix}: ${body}`,
        status >= 500 ? ErrorCode.InternalError : ErrorCode.InvalidRequest,
        status
      );
  }
}
