(function(app) {
  app.TasksComponent = ng.core
    .Component({
      selector: 'tasks-list',
      templateUrl:'tasks.component.html',
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
