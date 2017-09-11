const sinon = require('sinon');
const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;

const server = require('../../src/server');

const postSentence = (sentence) =>
  request(server)
    .post('/palindromes')
    .send({ sentence })
    .set('Accept', 'application/json');

const getSentences = () => request(server).get('/palindromes');

const nukeStorage = () => request(server).delete('/palindromes');

describe('GET /palindromes', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  it('should return the list of inserted entries', (done) => {
    nukeStorage()
      .then(() => postSentence('Abc, Ba.'))
      .then(() => postSentence('Test Set'))
      .then(() => getSentences())
      .then((res) => {
        assert.deepEqual(res.body.sort(), ['Abc, Ba.', 'Test Set']);
      })
      .then(done)
      .catch(done);
  });

  it('should squash duplicates together', (done) => {
    nukeStorage()
      .then(() => postSentence('Abc, Ba.'))
      .then(() => postSentence('Abc, Ba.'))
      .then(() => getSentences())
      .then((res) => {
        assert.deepEqual(res.body.sort(), ['Abc, Ba.']);
      })
      .then(done)
      .catch(done);
  });

  it('should let results entries expire after 10 minutes', (done) => {
    nukeStorage()
      .then(() => postSentence('Abc, Ba.'))
      .then(() => postSentence('Test Set'))
      .then(() => {
        clock.tick(600010);
        return getSentences();
      })
      .then((res) => {
        assert.equal(res.body.length, 0);
      })
      .then(done)
      .catch(done);
  });
});

describe('POST /palindromes', () => {
  it('should return true if the payload is palindromic', (done) => {
    postSentence('Abc, Ba.')
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body, { isValid: true });
      })
      .then(done)
      .catch(done);
  });

  it('should return false if the payload is not palindromic', (done) => {
    postSentence('abcd')
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.body, { isValid: false });
      })
      .then(done)
      .catch(done);
  });

  it('should return false if the payload is not palindromic', (done) => {
    postSentence('abcd')
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.body, { isValid: false });
      })
      .then(done)
      .catch(done);
  });

  it('should not allow empty strings', (done) => {
    postSentence('')
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.body, { isValid: false });
      })
      .then(done)
      .catch(done);
  });
});
