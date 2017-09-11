const express = require('express');
const logger = require('winston');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const palindromesControllerFactory = require('./controllers/palindromes');
const palindromesRoutesFactory = require('./routes/palindromes');
const palindromeDomain = require('./domain/palindrome');
const storeFactory = require('./store');

const store = storeFactory({
  timeLimit: 10,
  sizeLimit: 10
});
const palindromesController = palindromesControllerFactory(logger, palindromeDomain, store);
const palindromesRoutes = palindromesRoutesFactory(palindromesController);

const app = express();

app.disable('etag');
app.use(helmet());

app.use(bodyParser.json({
  type: 'application/json'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

// request logger
app.use(expressWinston.logger({
  transports: [
    new logger.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

app.use('/palindromes', palindromesRoutes);

// error logger
app.use(expressWinston.errorLogger({
  transports: [
    new logger.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

const server = app.listen(process.env.PORT || 29292, () => {
  logger.info('Listening on port ' + server.address().port);
});

module.exports = server;
