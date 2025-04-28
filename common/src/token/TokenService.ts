import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StringValue } from 'ms';

export interface BasePayload extends JwtPayload {}

export interface PayloadRequest<T extends BasePayload> extends Request {
    payload?: T;
    token?: string;
    isTokenExpired: boolean;
}

export interface TokenServiceOptions {
    secretKey: string;
    expiresIn?: number | StringValue;
}

export class TokenService<T extends BasePayload> {
    private readonly secretKey: string;
    private readonly expiresIn: number | StringValue;

    constructor(options: TokenServiceOptions) {
        this.secretKey = options.secretKey;
        this.expiresIn = options.expiresIn || '1h';
    }

    public generateToken(payload: T, expiresIn?: number | StringValue): string {
        const options: SignOptions = {
            expiresIn: expiresIn ?? this.expiresIn,
        };
        return jwt.sign(payload, this.secretKey, options);
    }

    public verifyToken(token: string): T {
        try {
            return jwt.verify(token, this.secretKey) as T;
        } catch (error) {
            throw new Error('Invalid or expired JWT token');
        }
    }

    public decodeToken(token: string): T | null {
        return jwt.decode(token) as T | null;
    }

    public attachTokenMiddleware(): RequestHandler {
        return ((
            req: PayloadRequest<T>,
            res: Response,
            next: NextFunction
        ) => {
            req.isTokenExpired = false;
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return next();
            }

            const token = authHeader.split(' ')[1];
            req.token = token;

            try {
                const payload = this.verifyToken(token);
                req.payload = payload;
                return next();
            } catch (error) {
                req.isTokenExpired = true;
                return next();
            }
        }) as RequestHandler;
    }
}
