const router = require('express').Router();

const routes = ({ postSentence, getSentences, nukeStorage }) => {
  router.post('', postSentence);
  router.get('', getSentences);

  if (process.env.NODE_ENV === 'test') {
    router.delete('', nukeStorage);
  }

  return router;
};

module.exports = routes;
