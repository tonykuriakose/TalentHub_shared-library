"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor(options) {
        this.secretKey = options.secretKey;
        this.expiresIn = options.expiresIn || '1h';
    }
    generateToken(payload, expiresIn) {
        const options = {
            expiresIn: expiresIn !== null && expiresIn !== void 0 ? expiresIn : this.expiresIn,
        };
        return jsonwebtoken_1.default.sign(payload, this.secretKey, options);
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            throw new Error('Invalid or expired JWT token');
        }
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    attachTokenMiddleware() {
        return ((req, res, next) => {
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
            }
            catch (error) {
                req.isTokenExpired = true;
                return next();
            }
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map