
import winston, { Logger } from 'winston';

const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const logger: Logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

export default logger;
