describe('fetch location test', function() {
  it('should get lat and lon from fetchLocation', function(done) {
    const onSuccess = function(location) {
      expect(location).to.have.property('lat');
      expect(location).to.have.property('lon');
      done();
    };

    const onError = function(err) {
      throw 'not expected';
    };

    this.timeout(10000);

    fetchLocation(onSuccess, onError);

    // bad:
    // * requires manually permitting location in browser
    // * fails if permission denied or not given in reasonable time
    // * fails if API can't get location
    // * relatively slow
  });
});
