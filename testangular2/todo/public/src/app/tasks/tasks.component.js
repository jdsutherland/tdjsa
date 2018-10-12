(function(app) {
  app.TasksComponent = ng.core
    .Component({
      selector: 'tasks-list',
      templateUrl:'tasks.component.html',
    })
    .Class({
      constructor: function() {
        this.tasks = [];
        this.messages = '';
      }
    });
})(window.app || (window.app = {}));
