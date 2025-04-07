import winston from "winston";
export declare const createLogger: (level: string, enableLogstash: boolean, logstash?: {
    host: string;
    port: number;
}) => winston.Logger;
export declare const customLogger: winston.Logger;
