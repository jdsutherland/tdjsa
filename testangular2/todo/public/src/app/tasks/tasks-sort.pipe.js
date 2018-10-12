(function(app) {
  app.TasksSortPipe = ng.core
    .Pipe({ name: 'sort' })
    .Class({
      constructor: function() {},
      // transform: function(tasks) {
      //   return tasks.slice().sort();
      // }
    });
}(window.app || (window.app = {})));
