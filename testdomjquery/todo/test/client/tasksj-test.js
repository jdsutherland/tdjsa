describe('tasks-with jQuery functions-test', () => {
  const readySpy = sinon.spy($.fn, 'ready');
  let sandbox;
  let domElements;
  let responseStub;
  let xhr;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    domElements = {};

    sandbox.stub(window, '$', selector => {
      return {
        html: value => { domElements[selector] = value; },
        click: value => { domElements[selector] = value; },
        val: () => {
          if(selector === '#name') return 'a new task';
          return '12/11/2016';
        }
      };
    });

    responseStub = JSON.stringify([
      {_id: '123412341201', name: 'task a', month: 8, day: 1, year: 2016},
      {_id: '123412341202', name: 'task b', month: 9, day: 10, year: 2016},
      {_id: '123412341203', name: 'task c', month: 10, day: 11, year: 2017},
    ]);

    xhr = sinon.useFakeXMLHttpRequest();
    xhr.requests = [];
    xhr.onCreate = (req) => { xhr.requests.push(req); }

  });

  afterEach(function() {
    sandbox.restore();
    xhr.restore();
  });

  it('jGetTasks should call jCallService', (done) => {
    sandbox.stub(window, 'jCallService', (params) => {
      expect(params.method).to.eql('GET');
      expect(params.url).to.eql('/tasks');
      done();
    })

    jGetTasks();
  });

  it('jGetTasks should register the jUpdateTasks with jCallService', function() {
    const jCallServiceMock = sandbox.mock(window)
      .expects('jCallService')
      .withArgs(sinon.match.any, jUpdateTasks);

    jGetTasks();
    jCallServiceMock.verify();
  });

  it('jUpdateTasks should update message if status != 200', () => {
    jUpdateTasks(404, '..err..')

    expect(domElements['#message']).to.eql('..err.. (status: 404)');
  });

  it('jUpdateTasks should update taskscount', () => {
    jUpdateTasks(200, responseStub);

    expect(domElements['#taskscount']).to.eql(3);
  });

  it('jUpdateTasks should update the tasks table', () => {
    jUpdateTasks(200, responseStub);

    expect(domElements['#tasks']).contains('<table>');
    expect(domElements['#tasks']).contains('<td>task a</td>');
    expect(domElements['#tasks']).contains('<td>8/1/2016</td>');
    expect(domElements['#tasks']).contains('<td>task b</td>');
  });

  it('jCallService should make call to service', () => {
    jCallService({method: 'GET', url: '/tasks' }, sandbox.spy())

    expect(xhr.requests[0].method).to.eql('GET');
    expect(xhr.requests[0].url).to.eql('/tasks');
    expect(xhr.requests[0].sendFlag).to.eql(true);
  });

  it('ajax should set dataType to text', function() {
    const ajaxMock = sandbox.mock($, 'ajax', function(options) {
      expect(options.dataType).to.be.eql('text');
    });

    jCallService({method: 'POST', url: '/tasks', data: '...some data...'});
    ajaxMock.verify();
  });

  it('jCallService should send xhr status code to callback', () => {
    const callback = sandbox.mock().withArgs(200).atLeast(1);

    jCallService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(200);

    callback.verify();
  });

  it('jCallService should send response to callback', () => {
    const callback = sandbox.mock().withArgs(200, '..res..').atLeast(1);

    jCallService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(200, {}, '..res..');

    callback.verify();
  });

  it('jCallService should send error response to callback', () => {
    const callback = sandbox.mock().withArgs(404).atLeast(1);

    jCallService({method: 'GET', url: '/tasks' }, callback)
    xhr.requests[0].respond(404, {}, '..err..');

    callback.verify();
  });

  it('jCallService should only send when final response received', () => {
    const callback = sandbox.spy();

    jCallService({method: 'GET', url: '/tasks' }, callback)

    expect(callback.callCount).to.eql(0);
  });

  it('should register jInitpage handler with document ready', function() {
    expect(readySpy.firstCall.args[0]).to.eql(jInitpage);
  });

  it('jInitpage should call jGetTasks', function(done) {
    sandbox.stub(window, 'jGetTasks', done);

    jInitpage();
  });

  it('jAddTask should call jCallService', function(done) {
    sandbox.stub(window, 'jCallService', (params, callback) => {
      expect(params.method).to.be.eql('POST');
      expect(params.url).to.be.eql('/tasks');
      expect(params.contentType).to.be.eql("application/json");

      var newTask = '{"name":"a new task","month":12,"day":11,"year":2016}';
      expect(params.data).to.be.eql(newTask);
      expect(callback).to.be.eql(jUpdateMessage);
      done();
    });

    jAddTask();
  });

  it('jCallService should send data to the service', function() {
    jCallService({method: 'POST', url: '/tasks', data: '..some data..'})

    expect(xhr.requests[0].requestBody).to.be.eql('..some data..');
  });

  it('jCallService should have default content type', function() {
    jCallService({method: 'POST', url: '/tasks', data: '..some data..'})

    expect(xhr.requests[0].requestHeaders['Content-Type']).contains('text/plain');
  });

  it('jCallService should set content type if present', function() {
    jCallService({
      method: 'POST',
      url: '/tasks',
      data: '..some data..',
      contentType: 'banana'
    })

    expect(xhr.requests[0].requestHeaders['Content-Type']).contains('banana');
  });

  it('jAddTask callback should update message', function() {
    jUpdateMessage(200, 'added');

    expect(domElements['#message']).to.be.eql('added (status: 200)');
  });

  it('jAddTask callback should call jGetTasks', function() {
    const jGetTasksMock = sandbox.mock(window).expects('jGetTasks');

    jUpdateMessage(200, 'added');

    jGetTasksMock.verify();
  });

  it('jInitpage should register add task click event', function() {
    jInitpage();
    expect(domElements['#submit']).to.eql(jAddTask);
  });

  it('jAddTask should return false', function() {
    expect(jAddTask()).to.eql(false);
  });

  it('jAddTask for invalid task: should skip jCallService call jUpdateMessage',
    () => {
      sandbox.stub(window, 'validateTask').returns(false);
      const jCallServiceMock = sandbox.spy(window, 'jCallService');
      const jUpdateMessageMock = sandbox.mock(window)
        .expects('jUpdateMessage')
        .withArgs(0, 'invalid task');

      jAddTask();

      expect(jCallServiceMock).not.to.be.called
      jUpdateMessageMock.verify();
  });

  it('jUpdateTasks should add a link for delete', function() {
    jUpdateTasks(200, responseStub);

    const expected = `
        <td>10/11/2017</td>
        <td><A onclick="deleteTask('123412341203');">delete</A></td>`
      .replace(/\s/g, '');

    expect(domElements['#tasks'].replace(/\s/g, '')).contains(expected);
  });

  it('jDeleteTask should call jCallService', function(done) {
    sandbox.stub(window, 'jCallService', params => {
      expect(params.method).to.eql('DELETE');
      expect(params.url).to.eql('/tasks/123412341203');
      done();
    });

    jDeleteTask('123412341203');
  });

  it('jDeleteTask should register jUpdateMessage', function() {
    const jCallServiceMock = sandbox.mock(window)
      .expects('jCallService')
      .withArgs(sinon.match.any, jUpdateMessage);

    jDeleteTask();

    jCallServiceMock.verify();
  });
});
