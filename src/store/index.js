const moment = require('moment');
const R = require('ramda');

const filterRecentEntries = (list, timeLimit, sizeLimit) => {
  const threshold = moment().subtract(timeLimit || 10, 'minutes');
  return list.filter(({ timestamp }) => timestamp.isAfter(threshold)).slice(0, sizeLimit || 10);
};

module.exports = ({ timeLimit, sizeLimit }) => {
  let storage = [];

  const addSentence = (sentence) => {
    const newStorage = R.filter((entry) => entry.sentence !== sentence, storage);

    newStorage.unshift({
      timestamp: moment(),
      sentence
    });

    storage = filterRecentEntries(newStorage, timeLimit, sizeLimit);
  };

  const retrieveSentences = () => filterRecentEntries(storage, timeLimit, sizeLimit).map(R.prop('sentence'));

  const nuke = () => storage = [];

  return {
    addSentence,
    retrieveSentences,
    nuke
  };
};
