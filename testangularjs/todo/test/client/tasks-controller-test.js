describe('tasks controller test', () => {
  let controller;
  let tasksServiceMock;
  let documentReadyHandler;

  beforeEach(module('todoapp'));

  beforeEach(inject(($controller, $document) => {
    $document.ready = handler => { documentReadyHandler = handler; }
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

  it('updateTasks should update tasks', () => {
    const tasksStub = [{sample: 1}];

    controller.updateTasks(tasksStub);

    expect(controller.tasks).to.eql(tasksStub);
  });

  it('updateError should update message', () => {
    controller.updateError('Not Found', 404);

    expect(controller.message).to.eql('Not Found (status: 404)');
  });

  it('sortTasks should sort based on year', () => {
    const task1 = { name: 'task a', month: 1, day: 10, year: 2017};
    const task2 = { name: 'task b', month: 1, day: 10, year: 2016};

    const sorted = controller.sortTasks([task1, task2]);

    expect(sorted).to.eql([task2, task1]);
  });

  it('sortTasks should sort on year, then month', () => {
    const task1 = { name: 'task a', month: 2, day: 10, year: 2017};
    const task2 = { name: 'task b', month: 1, day: 10, year: 2016};
    const task3 = { name: 'task c', month: 1, day: 10, year: 2017};

    const sorted = controller.sortTasks([task1, task2, task3]);

    expect(sorted).to.eql([task2, task3, task1]);
  });

  it('sortTasks should sort on year, month, then day', () => {
    const task1 = { name: 'task a', month: 1, day: 20, year: 2017};
    const task2 = { name: 'task b', month: 1, day: 14, year: 2017};
    const task3 = { name: 'task c', month: 1, day: 10, year: 2017};

    const sorted = controller.sortTasks([task1, task2, task3]);

    expect(sorted).to.eql([task3, task2, task1]);
  });

  it('sortTasks should sort on year, month, day, then name', () => {
    const task1 = { name: 'task a', month: 1, day: 20, year: 2017};
    const task2 = { name: 'task c', month: 1, day: 20, year: 2017};
    const task3 = { name: 'task b', month: 1, day: 20, year: 2017};

    const sorted = controller.sortTasks([task1, task2, task3]);

    expect(sorted).to.eql([task1, task3, task2]);
  });

  it('updateTasks should call sortTasks', () => {
    const tasksStub = [{sample: 1}];

    controller.sortTasks = tasks => {
      expect(tasks).to.eql(tasksStub);
      return '..sorted..';
    }

    controller.updateTasks(tasksStub);

    expect(controller.tasks).to.eql('..sorted..');
  });

  it('should register getTasks as handler for document ready', () => {
    expect(documentReadyHandler).to.eql(controller.getTasks);
  });

})
