"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
exports.allowedRoles = allowedRoles;
exports.isAuthenticated = ((req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.isTokenExpired) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    next();
});
function allowedRoles(...allowedRoles) {
    return [
        exports.isAuthenticated,
        ((req, res, next) => {
            var _a, _b;
            if (((_a = req.payload) === null || _a === void 0 ? void 0 : _a.role) && allowedRoles.includes(req.payload.role)) {
                return next();
            }
            if ((_b = req.payload) === null || _b === void 0 ? void 0 : _b.isBlocked) {
                return res.status(403).json({ message: 'You are blocked' });
            }
            return res.status(403).json({ message: 'Access denied' });
        }),
    ];
}
//# sourceMappingURL=userMiddleware.js.map