const expect = require('chai').expect;
const isPalindrome = require('../src/palindrome');

describe('palindrome-test', function() {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it('should return true for argument mom', () => {
    const aWord = 'mom';

    const result = isPalindrome(aWord);

    expect(result).to.be.ok;
  });
});

