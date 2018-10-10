(function(app) {
  app.LangsService = ng.core
    .Class({
      constructor: [ng.http.Http, _http => {
        this.http = _http;
      }],

      get: () => {
        return this.http.get('/languages')
                   .map(this.extractData)
                   .catch(this.returnError);
      },

      extractData: response => {
        if (reponse.status !== 200) {
          throw new Error(`error getting data, status: ${response.status}`);
        }
        return response.text();
      },

      returnError: error => {
        return Rx.Observable.throw(
          error.message || `error, status: ${error.status}`);
      }

    });
}(window.app || (window.app = {})));

