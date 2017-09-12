const R = require('ramda');

/**
 * Receive injected store and domain methods and implement the actual service logic
 */
module.exports = (logger, { isPalindrome }, { addSentence, retrieveSentences, nuke }) => {
  const postSentence = (req, res) => {
    const sentence = R.path(['body', 'sentence'], req);

    logger.info('Add sentence to store', sentence);

    // client posted an empty or missing {sentence} parameter
    if (!sentence) {
      res.status(403).json({ isValid: false });
      return undefined;
    }

    // true if the sentence is actually palindromic
    const isValid = isPalindrome(sentence);

    // if the sentence is palindromic, add it to the store
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
