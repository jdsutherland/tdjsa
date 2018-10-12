(function(app) {
  app.TasksComponent = ng.core
    .Component({
      selector: 'tasks-list',
      templateUrl:'tasks.component.html',
    })
    .Class({
      constructor: function(_tasksService) {
        this.tasks = [];
        this.messages = '';
        this.service = _tasksService;
      },
      getTasks: function() {
        this.service.get()
          .subscribe(
            this.updateTasks.bind(this),
            this.updateError.bind(this)
          );
      },
      updateTasks: function() {},
      updateError: function() {},

    });
})(window.app || (window.app = {}));
