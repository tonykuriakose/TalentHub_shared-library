import { ServiceError } from "@grpc/grpc-js";
import { ApplicationError } from "../app.errors";
export declare function mapGrpcErrorToHttpStatus(error: ServiceError): number;
export declare function mapErrorToGrpcStatus(error: ApplicationError): number;
export declare function querySanitizer(query: string): string;
