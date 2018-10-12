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
});

