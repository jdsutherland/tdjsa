(function(app) {
  app.TasksComponent = ng.core
    .Component({
      selector: 'tasks-list',
      templateUrl:'tasks.component.html',
      providers: [ng.http.HTTP_PROVIDERS, app.TasksService, app.TasksSortPipe],

    })
    .Class({
      constructor: [app.TasksService, app.TasksSortPipe,
      function(_tasksService, _sortPipe) {
        this.tasks = [];
        this.newTask = {name: '', date: ''};
        this.messages = '';
        this.service = _tasksService;
        this.sortPipe = _sortPipe;
      }],
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
      convertNewTaskToJSON: function() {
        const dateParts = this.newTask.date.split('/');
        return {
          name: this.newTask.name,
          month: parseInt(dateParts[0]),
          day: parseInt(dateParts[1]),
          year: parseInt(dateParts[2])
        };
      }

    });
})(window.app || (window.app = {}));
