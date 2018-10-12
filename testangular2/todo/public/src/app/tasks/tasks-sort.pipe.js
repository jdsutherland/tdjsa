(function(app) {
  app.TasksSortPipe = ng.core
    .Pipe({ name: 'sort' })
    .Class({
      constructor: function() {},
      transform: function(tasks) {
        const compareTwoTasks = (task1, task2) => {
          return task1.year - task2.year;
        };

        return tasks.sort(compareTwoTasks);
      }
    });
}(window.app || (window.app = {})));
