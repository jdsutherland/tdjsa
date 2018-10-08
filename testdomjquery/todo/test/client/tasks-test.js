describe('tasks-with builtin functions-tests', () => {
  let sandbox;
  let responseStub;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    domElements = {};

    sandbox.stub(document, 'getElementById', id => {
      if (!domElements[id]) domElements[id] = {};
      return domElements[id];
    });

    responseStub = JSON.stringify([
      {_id: '123412341201', name: 'task a', month: 8, day: 1, year: 2016},
      {_id: '123412341202', name: 'task b', month: 9, day: 10, year: 2016},
      {_id: '123412341203', name: 'task c', month: 10, day: 11, year: 2017},
    ]);
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

  it('updateTasks should update message if status != 200', () => {
    updateTasks(404, '..err..');

    expect(domElements.message.innerHTML).to.eql('..err.. (status: 404)');
  });

  it('updateTasks should update taskscount', () => {
    updateTasks(200, responseStub);

    expect(domElements.taskscount.innerHTML).to.eql(3);
  });

  it('updateTasks should update the tasks table', () => {
    updateTasks(200, responseStub);

    expect(domElements.tasks.innerHTML).contains('<table>');
    expect(domElements.tasks.innerHTML).contains('<td>task a</td>');
    expect(domElements.tasks.innerHTML).contains('<td>8/1/2016</td>');
    expect(domElements.tasks.innerHTML).contains('<td>task b</td>');
  });
});
