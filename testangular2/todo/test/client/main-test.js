describe('main tests', function() {
  let handler;

  document.addEventListener = function(event, eventHandler) {
    if (event === 'DOMContentLoaded') {
      handler = eventHandler;
    }
  }

  it('main registers TaskComponent with bootstrap', (done) => {
    ng.platformBrowserDynamic.bootstrap = component => {
      expect(component).to.eql(app.TasksComponent);
      done();
    }

    handler();
  });
});

