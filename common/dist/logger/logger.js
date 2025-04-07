"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(logger) {
        this.logger = logger;
    }
    info(message, meta) {
        this.logger.info(message, meta);
    }
    warn(message, meta) {
        this.logger.warn(message, meta);
    }
    error(message, meta) {
        this.logger.error(message, meta);
    }
    debug(message, meta) {
        this.logger.debug(message, meta);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map