import { Logger as WinstonLogger } from 'winston';
declare class Logger {
    private logger;
    constructor(logger: WinstonLogger);
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}
export default Logger;
