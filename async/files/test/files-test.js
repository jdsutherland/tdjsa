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
});
