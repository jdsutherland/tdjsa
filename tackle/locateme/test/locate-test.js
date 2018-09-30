describe('set-location test', function() {
  it('should set the URL on window.location', () => {
    const windowStub = {};
    const url = 'http://maps.google.com?q=-33.857,151.215';

    setLocation(windowStub, url);

    expect(windowStub.location).to.eql(url);
  });
});
