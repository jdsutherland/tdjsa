const TasksController = function() {
  const controller = this;

  controller.tasks = [];
  controller.message = '';
};

angular.module('todoapp', [])
  .controller('TasksController', [TasksController]);
