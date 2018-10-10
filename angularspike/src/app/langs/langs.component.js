(function(app) {
  app.LangsComponent = ng.core
    .Component({
      selector: 'lang-names',
      templateUrl: 'langs.component.html',
      providers: [ng.http.HTTP_PROVIDERS, app.LangsService],
      pipes: [app.SortPipe]
    })
    .Class({
      constructor: [app.LangsService, _langsService => {
        this.langsService = _langsService;
        this.langs = [];
        this.message = '';
      }],

      getLangs: () => {
        this.langsService.get()
          .subscribe(
            this.updateLangs.bind(this),
            this.updateError.bind(this),
          )
      },

      updateLangs: langs => {
        this.message = '';
        this.langs = langs.split('\n');
      },

      updateError: error => {
        this.message = error;
        this.langs = [];
      },

      ngOnInit: () => {
        this.getLangs();
      }

    });

}(window.app || (window.app = {})));

