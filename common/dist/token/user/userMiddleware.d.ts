import { UserRole } from "./userPayload";
import { RequestHandler } from 'express';
export declare const isAuthenticated: RequestHandler;
export declare function allowedRoles(...allowedRoles: UserRole[]): RequestHandler[];
