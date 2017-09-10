const chai = require('chai');
const assert = chai.assert;

const storeFactory = require('../../src/store');
const store = storeFactory({
  timeLimit: 10,
  sizeLimit: 10
});

describe('store', () => {
  it('should store any type of string', () => {
    store.nuke();
    store.addSentence('abc');
    store.addSentence('bcd,.---');
    const res = store.retrieveSentences();
    assert.deepEqual(res, ['abc', 'bcd,.---']);
  });

  it('should allow a maximum of 10 entries', () => {
    store.nuke();
    store.addSentence('abc');
    store.addSentence('bcd');
    store.addSentence('cde');
    store.addSentence('def');
    store.addSentence('efg');
    store.addSentence('ghi');
    store.addSentence('hij');
    store.addSentence('ijk');
    store.addSentence('jkl');
    store.addSentence('klm');
    store.addSentence('lmn');
    const res = store.retrieveSentences();
    assert.equal(res.length, 10);
  });
});
