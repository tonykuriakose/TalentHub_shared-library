"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidIdError = exports.InternalError = exports.MissingFieldError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ApplicationError = void 0;
/**
 * Base class for application errors.
 */
class ApplicationError extends Error {
    constructor(code, message) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationError = ApplicationError;
/**
 * Error class for bad requests (HTTP 400).
 */
class BadRequestError extends ApplicationError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Error class for unauthorized access (HTTP 401).
 */
class UnauthorizedError extends ApplicationError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Error class for forbidden access (HTTP 403).
 */
class ForbiddenError extends ApplicationError {
    constructor(message) {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Error class for not found resources (HTTP 404).
 */
class NotFoundError extends ApplicationError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Error class for missing required fields.
 */
class MissingFieldError extends BadRequestError {
    constructor(fieldName) {
        super(`${fieldName} is required`);
    }
}
exports.MissingFieldError = MissingFieldError;
/**
 * Error class for internal server errors (HTTP 500).
 */
class InternalError extends ApplicationError {
    constructor(message) {
        super(500, message);
    }
}
exports.InternalError = InternalError;
/**
 * Error class for invalid IDs.
 */
class InvalidIdError extends BadRequestError {
    constructor(message = "Invalid Id") {
        super(message);
    }
}
exports.InvalidIdError = InvalidIdError;
//# sourceMappingURL=app.errors.js.map