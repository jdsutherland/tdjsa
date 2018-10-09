const TasksController = function(tasksService, $filter) {
  const controller = this;

  controller.tasks = [];
  controller.message = '';

  controller.getTasks = () => {
    tasksService.get(controller.updateTasks, controller.updateError);
  }

  controller.updateTasks = tasks => {
    controller.tasks = controller.sortTasks(tasks);
  }

  controller.updateError = (error, status) => {
    controller.message = `${error} (status: ${status})`;
  }

  controller.sortTasks = tasks => {
    const orderBy = $filter('orderBy');
    return orderBy(tasks, ['year', 'month', 'day', 'name']);
  }

};

angular.module('todoapp', [])
  .controller('TasksController', ['TasksService', '$filter', TasksController]);
