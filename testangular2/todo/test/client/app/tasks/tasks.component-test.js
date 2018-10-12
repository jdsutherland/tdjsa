describe('tasks component tests', function() {
  let tasksComponent;
  let sandbox;
  let tasksService;

  const observable = { subscribe: function() {} };
  const updateTasksBindStub = () => {};
  const updateErrorBindStub = () => {};
  const sortPipe = { transform: data => { return data; } };

  beforeEach(function() {
    tasksService = {
      get: () => {},
      add: () => {},
      delete: () => {},
    };
    tasksComponent = new app.TasksComponent(tasksService, sortPipe);

    sandbox = sinon.sandbox.create();

    sandbox.stub(tasksComponent.updateTasks, 'bind')
      .withArgs(tasksComponent)
      .returns(updateTasksBindStub);

    sandbox.stub(tasksComponent.updateError, 'bind')
      .withArgs(tasksComponent)
      .returns(updateErrorBindStub);

    sandbox.stub(tasksService, 'get').withArgs().returns(observable);
  });

  afterEach(function() {
    sandbox.restore();
  });


  it('should set the selector attribute', () => {
    const componentAnnotations =
      Reflect.getMetadata('annotations', app.TasksComponent)[0];

    expect(componentAnnotations.selector).to.eql('tasks-list');
  });

  it('should set the templateUrl attribute', () => {
    const componentAnnotations =
      Reflect.getMetadata('annotations', app.TasksComponent)[0];

    expect(componentAnnotations.templateUrl).to.eql('tasks.component.html');
  });

  it('should initialize tasks to empty array', () => {
    expect(tasksComponent.tasks).to.eql([]);
  });

  it('should initialize messages to empty string', () => {
    expect(tasksComponent.messages).to.eql('');
  });

  it('getTasks should register handlers with service', () => {
    observableMock = sandbox.mock(observable)
      .expects('subscribe')
      .withArgs(updateTasksBindStub, updateErrorBindStub);

    tasksComponent.getTasks();

    observableMock.verify();
  });

  it('updateTasks should update tasks', () => {
    const tasksStub = [{sample: 1}];

    tasksComponent.updateTasks(tasksStub);

    expect(tasksComponent.tasks).to.eql(tasksStub);
  });

  it('updateError should update tasks', () => {
    const messageStub = "Not Found";
    tasksComponent.updateError(messageStub);

    expect(tasksComponent.messages).to.eql(messageStub);
  });

  it('getTasks is called on init', () => {
    const getTasksMock = sandbox.mock(tasksComponent).expects('getTasks')

    tasksComponent.ngOnInit();

    getTasksMock.verify();
  });

  it('updateTasks should call transform on pipe', () => {
    const tasksStub = '...fake input...'
    const expectedSortedTasks = '...fake output...';

    sandbox.stub(sortPipe, 'transform')
      .withArgs(tasksStub)
      .returns(expectedSortedTasks);

    tasksComponent.updateTasks(tasksStub);

    expect(tasksComponent.tasks).to.eql(expectedSortedTasks);
  });

  it('should verify the necessary providers', () => {
    const componentAnnotations =
      Reflect.getMetadata('annotations', app.TasksComponent)[0];

    const expectedProviders =
      [ng.http.HTTP_PROVIDERS, app.TasksService, app.TasksSortPipe];

    expect(componentAnnotations.providers).to.eql(expectedProviders);
  });

  it('TasksService should be injected into the component', () => {
    const injectedServices =
      Reflect.getMetadata('parameters', app.TasksComponent);

    expect(injectedServices[0]).to.eql([app.TasksService]);
    expect(injectedServices[1]).to.eql([app.TasksSortPipe]);
  });

  it('newTask should be initialized properly', () => {
    expect(tasksComponent.newTask.name).to.eql('');
    expect(tasksComponent.newTask.date).to.eql('');
  });

  it('should properly convert newTask with no data to JSON', () => {
    const newTask = tasksComponent.convertNewTaskToJSON();

    expect(newTask.name).to.be.eql('');
    expect(newTask.month).to.be.NAN;
    expect(newTask.day).to.be.NAN;
    expect(newTask.year).to.be.NAN;
  });

  it('should properly convert newTask with data to JSON', () => {
    const newTask = {name: 'task a', date: '6/10/2016'};
    const newTaskJSON = {name: 'task a', month: 6, day: 10, year: 2016};

    tasksComponent.newTask = newTask;

    expect(tasksComponent.convertNewTaskToJSON()).to.be.eql(newTaskJSON);
  });
});

