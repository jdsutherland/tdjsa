describe('create-url test', function() {
  it('should return proper url given lat and lon', () => {
    const latitude = -33.857;
    const longitude = 151.215;

    const url = createURL(latitude, longitude);

    expect(url).to.eql('http://maps.google.com?q=-33.857,151.215');
  });

  it('should return proper url given another lat and lon', () => {
    const latitude = 37.862
    const longitude = -122.423;

    const url = createURL(latitude, longitude);

    expect(url).to.eql('http://maps.google.com?q=37.862,-122.423');
  });

  it('should return an empty string if latitude is undefined', () => {
    const latitude = undefined
    const longitude = -122.423;

    const url = createURL(latitude, longitude);

    expect(url).to.eql('');
  });

  it('should return an empty string if longitude is undefined', () => {
    const latitude = -122.423;
    const longitude = undefined;

    const url = createURL(latitude, longitude);

    expect(url).to.eql('');
  });

});

