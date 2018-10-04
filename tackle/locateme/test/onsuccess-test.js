describe('onsuccess-test', () => {
  it('should call createURL with lat and lon', () => {
    const createURLSpy = sandbox.spy(window, 'createURL');
    const position = { coords: { latitude: 40.41, longitude: -105.55 } };

    onSuccess(position);

    expect(createURLSpy).to.have.been.calledWith(40.41, -105.55);
  });

  it('should call setLocation with URL returned from createURL', () => {
    const url = 'http://example.com';
    sandbox.stub(window, 'createURL')
      .returns(url)
    const setLocationSpy = sandbox.spy(window, 'setLocation');
    const position = { coords: { latitude: 40.41, longitude: -105.55 } };

    onSuccess(position);

    expect(setLocationSpy).to.have.been.calledWith(window, url);
  });
});
