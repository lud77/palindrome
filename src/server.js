const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { logger, requestLogger, errorLogger } = require('./logger');

const palindromesControllerFactory = require('./controllers/palindromes');
const palindromesRoutesFactory = require('./routes/palindromes');
const palindromesDomain = require('./domain/palindromes');
const storeFactory = require('./store');

const store = storeFactory({
  timeLimit: 10,
  sizeLimit: 10
});
const palindromesController = palindromesControllerFactory(logger, palindromesDomain, store);
const palindromesRoutes = palindromesRoutesFactory(palindromesController);

const app = express();

app.disable('etag');
app.use(helmet());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/palindromes', palindromesRoutes);

app.use(errorLogger);

const server = app.listen(process.env.PORT || 29292, () => {
  logger.info('Listening on port ' + server.address().port);
});

module.exports = server;
