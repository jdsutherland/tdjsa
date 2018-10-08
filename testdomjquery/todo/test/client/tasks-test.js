describe('tasks-with builtin functions-tests', () => {
  let sandbox;
  let responseStub;
  let xhr;

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

    xhr = sinon.useFakeXMLHttpRequest();
    xhr.requests = [];
    xhr.onCreate = req => { xhr.requests.push(req); }

    domElements = {
      name: {value: 'a new task'},
      date: {value: '12/11/2016'},
    };
  });

  afterEach(function() {
    sandbox.restore();
    xhr.restore();
  });

  describe('getTasks', () => {
    it('getTasks should call callService', (done) => {
      sandbox.stub(window, 'callService', (params) => {
        expect(params.method).to.eql('GET');
        expect(params.url).to.eql('/tasks');
        done();
      })

      getTasks();
    });

    it('getTasks should register the updateTasks with callService', function() {
      const callServiceMock = sinon.mock(window)
        .expects('callService')
        .withArgs(sinon.match.any, updateTasks)

      getTasks();
      callServiceMock.verify();
    });
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

  it('callService should make call to service', () => {
    callService({method: 'GET', url: '/tasks' }, sandbox.spy())

    expect(xhr.requests[0].method).to.eql('GET');
    expect(xhr.requests[0].url).to.eql('/tasks');
    expect(xhr.requests[0].sendFlag).to.eql(true);
  });

  it('callService should send xhr status code to callback', () => {
    const callback = sandbox.mock().withArgs(200).atLeast(1);

    callService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(200);

    callback.verify();
  });

  it('callService should send response to callback', () => {
    const callback = sandbox.mock().withArgs(200, '..res..').atLeast(1);

    callService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(200, {}, '..res..');

    callback.verify();
  });

  it('callService should send error response to callback', () => {
    const callback = sandbox.mock().withArgs(404, '..err..').atLeast(1);

    callService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(404, {}, '..err..');

    callback.verify();
  });

  it('callService should only send when final response received', () => {
    const callback = sandbox.spy();
    callService({method: 'GET', url: '/tasks' }, callback)

    expect(callback.callCount).to.eql(0);
  });

  it('callService should send data to the service', () => {
    callService({method: 'POST', url: '/tasks', data: '..some data..'});
  });

  it('callService should have default content-type', () => {
    callService({method: 'POST', url: '/tasks', data: '..some data..'});

    expect(xhr.requests[0].requestHeaders['Content-Type']).contains('text/plain');
  });

  it('callService should set  content-type if present', () => {
    callService({method: 'POST', url: '/tasks', data: '..some data..',
      contentType: 'whatever'});

    expect(xhr.requests[0].requestHeaders['Content-Type']).contains('whatever');
  });

  it('should register initpage handler with window onload', () => {
    expect(window.onload).to.eql(initpage);
  });

  it('initpage should call getTasks', (done) => {
    sandbox.stub(window, 'getTasks', done);

    initpage();
  });

  it('addTask should call callService', (done) => {
    sandbox.stub(window, 'callService', (params, callback) => {
      expect(params.method).to.eql('POST');
      expect(params.url).to.eql('/tasks');
      expect(params.contentType).to.eql('application/json');

      const newTask = '{"name":"a new task","month":12,"day":11,"year":2016}';
      expect(params.data).to.eql(newTask);
      expect(callback).to.eql(updateMessage);
      done();
    });

    addTask();
  });

  it('addTask callback should update message', () => {
    updateMessage(200, 'added');

    expect(domElements.message.innerHTML).to.eql('added (status: 200)');
  });

  it('addTask callback should call getTasks', () => {
    const getTasksMock = sandbox.mock(window).expects('getTasks').once();

    updateMessage(200, 'task added');
    getTasksMock.verify();
  });

  it('initpage should register add task click event', () => {
    initpage();

    expect(domElements.submit.onclick).to.eql(addTask);
  });

  it('addTask should return false', () => {
    expect(addTask()).to.eql(false);
  });

  it('addTask for invalid task: should skip callServiceMock call updateMessage', () => {
    const updateMessageMock = sandbox.mock(window)
      .expects('updateMessage')
      .withArgs(0, 'invalid task');
    const callServiceMock = sandbox.spy(window, 'callService');
    sandbox.stub(window, 'validateTask').returns(false);

    addTask();

    updateMessageMock.verify();
    expect(callServiceMock).not.to.be.called;
  });
});
