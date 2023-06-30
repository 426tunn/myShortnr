import morgan, { StreamOptions } from 'morgan';
import logger from './logger';

interface LogMessage {
  method: string;
  url: string;
  status: string;
  contentLength: string;
  responseTime: string;
}

const format = ':method :url :status :res[content-length] :response-time';

const httpLogger = morgan(format, {
  stream: {
    write: (message: string) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message) as LogMessage;

      logger.info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
      });
    }
  } as StreamOptions
});

export default httpLogger;




