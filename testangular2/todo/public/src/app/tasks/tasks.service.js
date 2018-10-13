(function(app) {
  app.TasksService = ng.core
    .Class({
      constructor: [ng.http.Http, function(_http) {
        this.http = _http;
      }],

      get: function() {
        return this.http.get('/tasks')
                   .map(this.extractData)
                   .catch(this.returnError);
      },

      add: function(task) {
        const options =
          {headers: new ng.http.Headers({'Content-Type': 'application/json'})};

        return this.http.post('/tasks', JSON.stringify(task), options)
                   .map(this.extractData)
                   .catch(this.returnError);
      },

      delete: function(taskId) {
        return this.http.delete(`/tasks/${taskId}`)
                   .map(this.extractData)
                   .catch(this.returnError);
      },

      extractData: function(response) {
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        try {
          return response.json();
        } catch (e) {
          return response.text();
        }
      },

      returnError: function(error) {
        return Rx.Observable.throw(error.message);
      },

    });
}(window.app || (window.app = {})));

