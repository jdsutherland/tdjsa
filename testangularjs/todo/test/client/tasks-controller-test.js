describe('tasks controller test', () => {
  let controller;

  beforeEach(module('todoapp'));

  beforeEach(inject($controller => {
    tasksServiceMock = {};
    controller = $controller('TasksController', {
      TasksService: tasksServiceMock
    });
  }));

  it('should pass canary', () => {
    expect(true).to.eql(true);
  });

  it('tasks should be empty on create', () => {
    expect(controller.tasks).to.eql([]);
  });

  it('message should be empty on create', () => {
    expect(controller.message).to.eql('');
  });

  it('getTasks should interact with the service', (done) => {
    controller.updateTasks = () => {};
    controller.updateError = () => {};

    tasksServiceMock.get = (success, err) => {
      expect(success).to.eql(controller.updateTasks);
      expect(err).to.eql(controller.updateError);
      done();
    }

    controller.getTasks();
  });
})
