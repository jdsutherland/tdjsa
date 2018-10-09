const TasksController = function(tasksService) {
  const controller = this;

  controller.tasks = [];
  controller.message = '';
  controller.getTasks = () => {
    tasksService.get(controller.updateTasks, controller.updateError);
  }
};

angular.module('todoapp', [])
  .controller('TasksController', ['TasksService', TasksController]);
