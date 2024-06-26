import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(
    info => `${info.timestamp} - [${info.level.toUpperCase()}] - (${info.label}) - ${info.message}`
  )
);

/**
 * Create a base logger instance with a timestamp and a custom format.
 */
const base = winston.createLogger({
  level: 'info',
  format,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(format, winston.format.colorize({ all: true }))
    })
  ]
});

export default base;
