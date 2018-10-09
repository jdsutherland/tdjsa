const TasksController = function(tasksService) {
  const controller = this;

  controller.tasks = [];
  controller.message = '';

  controller.getTasks = () => {
    tasksService.get(controller.updateTasks, controller.updateError);
  }

  controller.updateTasks = tasks => {
    controller.tasks = tasks;
  }

  controller.updateError = (error, status) => {
    controller.message = `${error} (status: ${status})`;
  }

};

angular.module('todoapp', [])
  .controller('TasksController', ['TasksService', TasksController]);
