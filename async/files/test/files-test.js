const expect = require('chai').expect;
const linesCount = require('../src/files');

describe('test server-side callback', function() {
  it('should return correct lines count for a valid file', (done) => {
    const callback = function(count) {
      expect(count).to.eql(16);
      done();
    };

    linesCount('src/files.js', callback);
  });

  it('should report an error for invalid filename', (done) => {
    const onError = function(error) {
      expect(error).to.eql('unable to open file src/NOPE.js');
      done();
    };

    linesCount('src/NOPE.js', undefined, onError);
  });
});
