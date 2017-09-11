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
});
