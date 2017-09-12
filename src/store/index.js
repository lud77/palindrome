const moment = require('moment');
const R = require('ramda');

/**
 * Remove item older than {timeLimit} minutes and items exceding the {sizeLimit} from the list
 * @return a new list with only the useful items
 */
const prune = (list, timeLimit, sizeLimit) => {
  const threshold = moment().subtract(timeLimit || 10, 'minutes');
  return list.filter(({ timestamp }) => timestamp.isAfter(threshold)).slice(0, sizeLimit || 10);
};

/**
 * This is the in-memory storage
 * All the entries older than {timeLimit} and exceding the desired {sizeLimit}
 * of the list are removed ASAP to keep the memory footprint low
 * Also, duplicates are considered useless and immediately removed
 */
module.exports = ({ timeLimit, sizeLimit }) => {
  let storage = []; // using let since we'll be replacing this array each time a new entry is added

  /**
   * Add a new sentence to the store and prune it
   */
  const addSentence = (sentence) => {
    // remove duplicates
    const newStorage = R.filter((entry) => entry.sentence !== sentence, storage);

    // add the new entry at the beginning of the list to simplify size management
    newStorage.unshift({
      timestamp: moment(),
      sentence
    });

    storage = prune(newStorage, timeLimit, sizeLimit);
  };

  /**
   * Retrieve up to {sizeLimit} sentences posted less than {timeLimit} minutes ago
   * @return an array of sentences
   */
  const retrieveSentences = () =>
    prune(storage, timeLimit, sizeLimit).map(R.prop('sentence'));

  /**
   * Empty the storage
   * Only used in tests
   */
  const nuke = () => storage = [];

  return {
    addSentence,
    retrieveSentences,
    nuke
  };
};
