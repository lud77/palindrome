const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

const storeFactory = require('../../src/store');
const store = storeFactory({
  timeLimit: 10,
  sizeLimit: 10
});

describe('store', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  it('should store any type of string', () => {
    store.nuke();
    store.addSentence('abc');
    store.addSentence('bcd,.---');
    const res = store.retrieveSentences();
    assert.deepEqual(res.sort(), ['abc', 'bcd,.---']);
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

  it('should only persist a sequence for 10 minutes', () => {
    store.nuke();
    store.addSentence('abc');
    store.addSentence('bcd');
    const resBefore = store.retrieveSentences();
    assert.equal(resBefore.length, 2);

    clock.tick(600010);
    const resAfter = store.retrieveSentences();
    assert.equal(resAfter.length, 0);
  });

  it('should only persist an instance of each sequence', () => {
    store.nuke();
    store.addSentence('abc');
    store.addSentence('abc');
    store.addSentence('bcd');
    store.addSentence('bcd');
    const res = store.retrieveSentences();
    assert.deepEqual(res.sort(), ['abc', 'bcd']);
  });
});
