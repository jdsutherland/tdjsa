const expect = require('chai').expect;
const linesCount = require('../src/files');

describe('test promises', function() {
  it('should return correct lines count for a valid file', (done) => {
    const checkCount = function(count) {
      expect(count).to.eql(16);
      done();
    }

    linesCount('src/files.js')
      .then(checkCount);
  });
});

