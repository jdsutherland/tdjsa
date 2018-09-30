describe('palindrome-test', function() {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it('should return true for argument mom', () => {
    expect(isPalindrome('mom')).to.be.true;
  });

  it('should return true for argument dad', () => {
    expect(isPalindrome('dad')).to.be.true;
  });

  it('should return false for argument dude', () => {
    expect(isPalindrome('dude')).to.be.false;
  });

  it('should return false for argument mom mom', () => {
    expect(isPalindrome('mom mom')).to.be.true;
  });

  it('should return false for argument mom dad', () => {
    expect(isPalindrome('mom dad')).to.be.false;
  });

  it('should return false for an empty string', () => {
    expect(isPalindrome('')).to.be.false;
  });

  it('should return false for two empty spaces', () => {
    expect(isPalindrome('  ')).to.be.false;
  });

  it('should throw exception on missing argument', () => {
    const call = function() { isPalindrome(); };

    expect(call).to.throw(Error, /invalid/i);
  });
});
