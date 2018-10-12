let tasksComponent;
let sandbox;
let tasksService;

const observable = { subscribe: function() {} };
const updateTasksBindStub = () => {};
const updateErrorBindStub = () => {};

beforeEach(function() {
  tasksService = {
    get: () => {},
    add: () => {},
    delete: () => {},
  };
  tasksComponent = new app.TasksComponent(tasksService);

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

describe('tasks component tests', function() {
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
});

