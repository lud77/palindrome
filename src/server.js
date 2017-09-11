const express = require('express');
const logger = require('winston');

const app = express();

const server = app.listen(process.env.PORT || 29292, () => {
  logger.info('Listening on port ' + server.address().port);
});

module.exports = server;
