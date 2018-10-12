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
});

