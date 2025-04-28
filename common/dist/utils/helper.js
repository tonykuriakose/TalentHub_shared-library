"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGrpcErrorToHttpStatus = mapGrpcErrorToHttpStatus;
exports.mapErrorToGrpcStatus = mapErrorToGrpcStatus;
exports.querySanitizer = querySanitizer;
const grpc = __importStar(require("@grpc/grpc-js"));
const app_errors_1 = require("../app.errors");
function mapGrpcErrorToHttpStatus(error) {
    switch (error.code) {
        case 3: // INVALID_ARGUMENT
            return 400;
        case 5: // NOT_FOUND
            return 404;
        case 7: // PERMISSION_DENIED
        case 16: // UNAUTHENTICATED
            return 401;
        case 13: // INTERNAL
            return 500;
        default:
            return 500;
    }
}
function mapErrorToGrpcStatus(error) {
    if (error instanceof app_errors_1.BadRequestError || error instanceof app_errors_1.MissingFieldError || error instanceof app_errors_1.InvalidIdError) {
        return grpc.status.INVALID_ARGUMENT;
    }
    if (error instanceof app_errors_1.UnauthorizedError) {
        return grpc.status.UNAUTHENTICATED;
    }
    if (error instanceof app_errors_1.ForbiddenError) {
        return grpc.status.PERMISSION_DENIED;
    }
    if (error instanceof app_errors_1.NotFoundError) {
        return grpc.status.NOT_FOUND;
    }
    if (error instanceof app_errors_1.InternalError) {
        return grpc.status.INTERNAL;
    }
    return grpc.status.INTERNAL;
}
function querySanitizer(query) {
    return query.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}
//# sourceMappingURL=helper.js.map