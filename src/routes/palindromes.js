const router = require('express').Router();

/**
 * Take the controller methods as injected dependencies and create the routes
 * @return a router object with the necessary routes
 */
const routes = ({ postSentence, getSentences, nukeStorage }) => {
  router.post('', postSentence);
  router.get('', getSentences);

  if (process.env.NODE_ENV === 'test') {
    router.delete('', nukeStorage);
  }

  return router;
};

module.exports = routes;
