describe('tasks service tests', function() {
  let http;
  let observable;
  let sandbox;
  let tasksService;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    http = {
      get: function() {},
      add: function() {},
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


});

