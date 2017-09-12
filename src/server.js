const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { logger, requestLogger, errorLogger } = require('./logger');

const palindromesControllerFactory = require('./controllers/palindromes');
const palindromesRoutesFactory = require('./routes/palindromes');
const palindromesDomain = require('./domain/palindromes');
const storeFactory = require('./store');
const config = require('./config');

// create instances of the necessary components using dependency injection

// create instances of the necessary components using dependency injection

const store = storeFactory({
  timeLimit: config.timeLimit,
  sizeLimit: config.sizeLimit
});
const palindromesController = palindromesControllerFactory(logger, palindromesDomain, store);
const palindromesRoutes = palindromesRoutesFactory(palindromesController);

const app = express();

// apply settings and middlewares

app.disable('etag');

app.use(helmet());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/palindromes', palindromesRoutes);

app.use(errorLogger);

// start server

const server = app.listen(process.env.PORT || 29292, () => {
  logger.info('Listening on port ' + server.address().port);
});

module.exports = server;
