import { JwtPayload } from 'jsonwebtoken';
import { Request, RequestHandler } from 'express';
import { StringValue } from 'ms';
export interface BasePayload extends JwtPayload {
}
export interface PayloadRequest<T extends BasePayload> extends Request {
    payload?: T;
    token?: string;
    isTokenExpired: boolean;
}
export interface TokenServiceOptions {
    secretKey: string;
    expiresIn?: number | StringValue;
}
export declare class TokenService<T extends BasePayload> {
    private readonly secretKey;
    private readonly expiresIn;
    constructor(options: TokenServiceOptions);
    generateToken(payload: T, expiresIn?: number | StringValue): string;
    verifyToken(token: string): T;
    decodeToken(token: string): T | null;
    attachTokenMiddleware(): RequestHandler;
}
