(function(app) {
  app.TasksComponent = ng.core
    .Component({
      selector: 'tasks-list',
      templateUrl:'tasks.component.html',
    })
    .Class({
      constructor: function(_tasksService, _sortPipe) {
        this.tasks = [];
        this.messages = '';
        this.service = _tasksService;
        this.sortPipe = _sortPipe;
      },
      getTasks: function() {
        this.service.get()
          .subscribe(
            this.updateTasks.bind(this),
            this.updateError.bind(this)
          );
      },
      updateTasks: function(tasks) {
        this.tasks = this.sortPipe.transform(tasks);
      },
      updateError: function(message) {
        this.messages = message;
      },
      ngOnInit: function() {
        this.getTasks();
      },

    });
})(window.app || (window.app = {}));
