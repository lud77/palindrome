const R = require('ramda');

module.exports = (logger, { isPalindrome }, { addSentence, retrieveSentences, nuke }) => {
  const postSentence = (req, res) => {
    const sentence = R.path(['body', 'sentence'], req);

    logger.info('Add sentence', sentence);

    if (!sentence) {
      res.status(403).json({ isValid: false });
      return undefined;
    }

    const isValid = isPalindrome(sentence);

    if (isValid) {
      addSentence(sentence);
    }

    res.status(isValid ? 200 : 403).json({ isValid });
  };

  const getSentences = (req, res) => {
    logger.info('Retrieve last sentences');
    res.status(200).json(retrieveSentences());
  };

  const nukeStorage = (req, res) => {
    logger.info('Nuke storage');
    nuke();
    res.status(204).send('Storage nuked');
  };

  return {
    postSentence,
    getSentences,
    nukeStorage
  };
};
