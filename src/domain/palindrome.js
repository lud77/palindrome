const R = require('ramda');

const stripNonAlphanumericChars = (sequence) => sequence.replace(/[^A-Za-z0-9]/g, '');

/**
 * Check whether a sentence is palindromic or not, regardless of case, spaces, and punctuation
 */
const isPalindrome = (sentence) => {
  const regularisedSentence = stripNonAlphanumericChars(sentence || '').toLowerCase();
  const reversedSentence = R.reverse(regularisedSentence);
  return regularisedSentence === reversedSentence;
};

module.exports = {
  isPalindrome
};
