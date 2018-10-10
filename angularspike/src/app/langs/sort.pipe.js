(function(app) {
  app.SortPipe = ng.core
    .Pipe({ name: 'sort' })
    .Class({
    constructor: () => {},
    transform: languages => {
      return languages.slice().sort();
    }});
}(window.app || (window.app = {})));
