describe('onerror-test', () => {
  it('should set the error DOM element', () => {
    const domElement = {innerHtml: ''};
    sandbox.stub(document, 'getElementById')
      .withArgs('error')
      .returns(domElement);
    const message = "you're kidding";
    const positionError = {message: message};

    onError(positionError);

    expect(domElement.innerHTML).to.eql(message);
  });
});
