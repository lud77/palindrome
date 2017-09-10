const chai = require('chai');
const assert = chai.assert;

const { isPalindrome } = require('../../src/domain/palindrome');

describe('domain methods', () => {
  describe('isPalindrome', () => {
    it('should return true for a palindromic sentence regardless of case, spaces and punctuation', () => {
      assert.isOk(isPalindrome('Noel sees Leon.'));
      assert.isOk(isPalindrome('Too far, Edna, wander afoot.'));
    });

    it('should return false for a non palindromic sentence', () => {
      assert.isNotOk(isPalindrome('noel sees a lion'));
      assert.isNotOk(isPalindrome('...abc...'));
    });
  });
});
