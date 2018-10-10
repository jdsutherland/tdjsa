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

  it('newTask should have empty `name` and `date` on create', () => {
    expect(controller.newTask.name).to.eql('');
    expect(controller.newTask.date).to.eql('');
  });

  it('should convert newTask with no data to JSON', () => {
    const newTask = controller.convertNewTaskToJSON();

    expect(newTask.name).to.eql('');
    expect(newTask.month).to.eql(NaN);
    expect(newTask.day).to.eql(NaN);
    expect(newTask.year).to.eql(NaN);
  });

  it('should convert newTask with data to JSON format', () => {
    const newTask = { name: 'task a', date: '6/10/2016' };
    const newTaskJSON = { name: 'task a', month: 6, day: 10, year: 2016 };

    controller.newTask = newTask;

    expect(controller.convertNewTaskToJSON()).to.eql(newTaskJSON);
  });

  it('addTask should call the service', (done) => {
    controller.updateMessage = () => {};
    controller.updateError = () => {};

    const convertedTask = controller.convertNewTaskToJSON(controller.newTask);

    tasksServiceMock.add = (task, success, error) => {
      expect(task).to.eql(convertedTask);
      expect(success).to.eql(controller.updateMessage);
      expect(error).to.eql(controller.updateError);
      done();
    };

    controller.addTask();
  });

  it('updateMessage should update message and call getTasks', (done) => {
    controller.getTasks = () => { done(); };
    controller.updateMessage('good');

    expect(controller.message).to.eql('good');
  });

  it('disableAddTask should make good use of validateTask', () => {
    const newTask = { name: 'task a', date: '6/10/2016' };
    const originalValidateTask = window.validateTask;
    window.validateTask = task => {
      expect(task.name).to.eql(newTask.name);
      expect(`${task.month}/${task.day}/${task.year}`).to.eql(newTask.date);
      return true;
    }
    controller.newTask = newTask;

    const resultOfDisableAddTask = controller.disableAddTask();

    window.validateTask = originalValidateTask;

    expect(resultOfDisableAddTask).to.eql(false);
  });
})
