describe('tasks service tests', function() {
  let http;
  let observable;
  let sandbox;
  let tasksService;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    http = {
      get: function() {},
      post: function() {},
      delete: function() {},
    };

    observable = {
      map: function() {},
      catch: function() {},
    }

    sandbox.stub(http, 'get').withArgs('/tasks').returns(observable);
    // sandbox.stub(http, 'add').withArgs('/tasks').returns(observable);
    // sandbox.stub(http, 'delete').withArgs('/tasks').returns(observable);

    tasksService = new app.TasksService(http);

    sandbox.stub(observable, 'map')
      .withArgs(tasksService.extractData)
      .returns(observable);
    sandbox.stub(observable, 'catch')
      .withArgs(tasksService.returnError)
      .returns(observable);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('get should make GET request to /tasks', () => {
    expect(tasksService.get()).to.eql(observable);
    expect(http.get.calledWith('/tasks')).to.eql(true);
    expect(observable.map.calledWith(tasksService.extractData)).to.eql(true);
    expect(observable.catch.calledWith(tasksService.returnError)).to.eql(true);
  });

  it('extractData should return result from json()', () => {
    const fakeJSON = {};
    const response = {status: 200, json: () => { return fakeJSON; }};

    expect(tasksService.extractData(response)).to.eql(fakeJSON);
  });

  it('extractData should throw exception for invalid status', () => {
    const response = {status: 404};

    expect(() => { tasksService.extractData(response) })
      .to.throw('Request failed with status: 404');
  });

  it('returnError should return an error Observable', () => {
    const error = {message: 'oops'};

    const observableThrowMock = sandbox.mock(Rx.Observable)
      .expects('throw')
      .withArgs(error.message);

    tasksService.returnError(error);

    observableThrowMock.verify();
  });

  it('should inject HTTP into constructor', () => {
    const injectedServices =
      Reflect.getMetadata('parameters', app.TasksService);

    expect(injectedServices[0]).to.eql([ng.http.Http]);
  });

  it('should pass task to /tasks using POST', () => {
    const taskStub = {name: 'foo', month: 1, day: 1, year: 2017};

    const options =
      {headers: new ng.http.Headers({'Content-Type': 'application/json'})};

    sandbox.stub(http, 'post')
      .withArgs('/tasks', JSON.stringify(taskStub), options)
      .returns(observable);

    expect(tasksService.add(taskStub)).to.eql(observable);
    expect(observable.map.calledWith(tasksService.extractData)).to.eql(true);
    expect(observable.catch.calledWith(tasksService.returnError)).to.eql(true);
  });

  it('extractData should return text if not json()', () => {
    const fakeBody = 'body';
    const response = { status: 200, text: () => { return fakeBody; } };

    expect(tasksService.extractData(response)).to.eql(fakeBody);
  });

  it('should pass task to /tasks using DELETE', () => {
    const sampleTaskId = '1234123412341234';

    sandbox.stub(http, 'delete')
      .withArgs(`/tasks/${sampleTaskId}`)
      .returns(observable);

    expect(tasksService.delete(sampleTaskId)).to.eql(observable);
    expect(observable.map.calledWith(tasksService.extractData)).to.eql(true);
    expect(observable.catch.calledWith(tasksService.returnError)).to.eql(true);
  });

});

