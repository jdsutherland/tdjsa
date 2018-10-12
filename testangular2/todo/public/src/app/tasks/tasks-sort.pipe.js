(function(app) {
  app.TasksSortPipe = ng.core
    .Pipe({ name: 'sort' })
    .Class({
      constructor: function() {},
      transform: function(tasks) {
        const compareTwoTasks = (task1, task2) => {
          return task1.year - task2.year
            || task1.month - task2.month
            || task1.day - task2.day
            || task1.name.localeCompare(task2.name);
        };

        return tasks.sort(compareTwoTasks);
      }
    });
}(window.app || (window.app = {})));
