describe('tasks-with builtin functions-tests', () => {
  let sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('getTasks should call callService', (done) => {
    sandbox.stub(window, 'callService', (params) => {
      expect(params.method).to.eql('GET');
      expect(params.url).to.eql('/tasks');
      done();
    })

    getTasks();
  });

  it('getTasks should register the updateTasks with callService', () => {
    const callServiceMock = sinon.mock(window)
      .expects('callService')
      .withArgs(sinon.match.any, updateTasks)

    getTasks();
    callServiceMock.verify();
  });
});
