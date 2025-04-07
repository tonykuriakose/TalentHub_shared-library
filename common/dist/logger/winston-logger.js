"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = exports.createLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_logstash_latest_js_1 = __importDefault(require("winston-logstash/lib/winston-logstash-latest.js"));
const createLogger = (level, enableLogstash, logstash = { host: 'localhost', port: 5044 }) => {
    const transports = [
        new winston_1.default.transports.Console(),
    ];
    if (enableLogstash) {
        transports.push(new winston_logstash_latest_js_1.default(Object.assign(Object.assign({}, logstash), { maxConnectRetries: 3, retryInterval: 5000, serializer: winston_1.default.format.json() })));
    }
    return winston_1.default.createLogger({
        level: level,
        transports: transports,
    });
};
exports.createLogger = createLogger;
exports.customLogger = (0, exports.createLogger)('info', false);
//# sourceMappingURL=winston-logger.js.map