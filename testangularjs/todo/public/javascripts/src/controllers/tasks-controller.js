const TasksController = function(tasksService, $filter, $document) {
  const controller = this;

  controller.tasks = [];
  controller.message = '';

  controller.getTasks = () => {
    tasksService.get(controller.updateTasks, controller.updateError);
  }

  controller.updateTasks = tasks => {
    controller.tasks = controller.sortTasks(tasks);
  }

  controller.addTask = () => {
    tasksService.add(
      controller.convertNewTaskToJSON(controller.newTask),
      controller.updateMessage,
      controller.updateError);
  }

  controller.disableAddTask = () => {
    return !validateTask(controller.convertNewTaskToJSON());
  }

  controller.updateMessage = message => {
    controller.message = message;
    controller.getTasks();
  }

  controller.updateError = (error, status) => {
    controller.message = `${error} (status: ${status})`;
  }

  controller.sortTasks = tasks => {
    const orderBy = $filter('orderBy');
    return orderBy(tasks, ['year', 'month', 'day', 'name']);
  }

  controller.newTask = {
    name: '',
    date: '',
  }

  controller.convertNewTaskToJSON = () => {
    const dateParts = controller.newTask.date.split('/');

    return {
      name: controller.newTask.name,
      month: parseInt(dateParts[0]),
      day: parseInt(dateParts[1]),
      year: parseInt(dateParts[2]),
    };
  }

  $document.ready(controller.getTasks);
};

angular.module('todoapp', [])
  .controller('TasksController', ['TasksService', '$filter', '$document', TasksController]);
