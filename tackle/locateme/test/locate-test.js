describe('set-location test', function() {
  it('should set the URL on window.location', () => {
    const windowStub = {};
    const url = 'http://maps.google.com?q=-33.857,151.215';

    setLocation(windowStub, url);

    expect(windowStub.location).to.eql(url);
  });
});

describe('locate-test', () => {
  it('should register handlers with getCurrentPosition', (done) => {
    const original = navigator.geolocation.getCurrentPosition;

    navigator.geolocation.getCurrentPosition = function(success, error) {
      expect(success).to.eql(onSuccess);
      expect(error).to.eql(onError);
      done();
    }

    locate();
    navigator.geolocation.getCurrentPosition = original;
  });
});
