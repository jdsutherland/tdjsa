const TasksService = function($http) {
  const service = this;

  service.get = (success, error) => {
    $http.get('tasks')
         .success(success)
         .error(error);
  }

  service.add = (task, success, error) => {
  }

  service.delete = (taskId, success, error) => {
  }

};

angular.module('todoapp')
  .service('TasksService', ['$http', TasksService]);
