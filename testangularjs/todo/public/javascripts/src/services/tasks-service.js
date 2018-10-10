const TasksService = function($http) {
  const service = this;

  service.get = (success, error) => {
    $http.get('tasks')
         .success(success)
         .error(error);
  }

  service.add = (task, success, error) => {
    $http.post('tasks', task)
         .success(success)
         .error(error);
  }

  service.delete = (taskId, success, error) => {
    $http.delete(`tasks/${taskId}`)
         .success(success)
         .error(error);
  }

};

angular.module('todoapp')
  .service('TasksService', ['$http', TasksService]);
