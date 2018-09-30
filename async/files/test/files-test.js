const expect = require('chai').expect;
const linesCount = require('../src/files');

describe('test server-side callback', function() {
  it('should return correct lines count for a valid file', () => {
    // Good try but this won't work
    const callback = function(count) {
      expect(count).to.eql(-2319);
    };

    linesCount('src/files.js', callback);
    // doesn't actually wait for callback to be executed
    // so test passes (lies!)
  });
});
