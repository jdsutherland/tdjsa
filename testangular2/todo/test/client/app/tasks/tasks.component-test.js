let tasksComponent;

beforeEach(function() {
  tasksComponent = new app.TasksComponent();
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
});

