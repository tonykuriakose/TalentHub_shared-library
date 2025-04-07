/**
 * Base class for application errors.
 */
export declare class ApplicationError extends Error {
    code: number;
    constructor(code: number, message: string);
}
/**
 * Error class for bad requests (HTTP 400).
 */
export declare class BadRequestError extends ApplicationError {
    constructor(message: string);
}
/**
 * Error class for unauthorized access (HTTP 401).
 */
export declare class UnauthorizedError extends ApplicationError {
    constructor(message: string);
}
/**
 * Error class for forbidden access (HTTP 403).
 */
export declare class ForbiddenError extends ApplicationError {
    constructor(message: string);
}
/**
 * Error class for not found resources (HTTP 404).
 */
export declare class NotFoundError extends ApplicationError {
    constructor(message: string);
}
/**
 * Error class for missing required fields.
 */
export declare class MissingFieldError extends BadRequestError {
    constructor(fieldName: string);
}
/**
 * Error class for internal server errors (HTTP 500).
 */
export declare class InternalError extends ApplicationError {
    constructor(message: string);
}
/**
 * Error class for invalid IDs.
 */
export declare class InvalidIdError extends BadRequestError {
    constructor(message?: string);
}
