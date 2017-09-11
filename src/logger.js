const logger = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new logger.transports.Console({
      json: true,
      colorize: true
    })
  ]
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new logger.transports.Console({
      json: true,
      colorize: true
    })
  ]
});

module.exports = {
  logger,
  requestLogger,
  errorLogger
};
