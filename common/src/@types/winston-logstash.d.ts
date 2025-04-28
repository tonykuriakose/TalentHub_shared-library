declare module "winston-logstash/lib/winston-logstash-latest.js" {
    import TransportStream from "winston-transport";
    import { Logform } from "winston";  // Import only needed types
  
    interface LogstashTransportOptions {
      host: string;
      port: number;
      maxConnectRetries?: number;
      retryInterval?: number;
      serializer?: Logform.Format;
    }
  
    class LogstashTransport extends TransportStream {
      constructor(options: LogstashTransportOptions);
    }
  
    export = LogstashTransport;
  }
  