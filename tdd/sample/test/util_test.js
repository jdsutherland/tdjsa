const expect = require('chai').expect;
const Util = require('../src/util');

describe('util tests', function() {
  it('should pass this canary test', () => {
    expect(true).to.eql(true);
  });

  let util;

  beforeEach(function() {
    util = new Util();
  });

  it('should pass if f2c returns 0C for 32F', () => {
    const farenheit = 32;

    const celcius = util.f2c(farenheit);

    expect(celcius).to.eql(0);
  });
});

