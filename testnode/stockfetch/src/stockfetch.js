const fs = require('fs');

const Stockfetch = function() {
  this.readTickersFile = function(filename, onError) {
    const processResponse = (err, data) => {
      if (err)
        onError(`Error reading file: ${filename}`);
      else {
        const tickers = this.parseTickers(data.toString());
        if (tickers.length === 0) {
          onError(`File ${filename} has invalid content`);
        } else {
          this.processTickers(tickers);
        }
      }
    };

    fs.readFile(filename, processResponse);
  };

  this.parseTickers = function(tickers) {
    if (tickers.trim().length === 0) {
      return [];
    }
    return tickers.split('\n');
  };
  this.processTickers = function(){};
};

module.exports = Stockfetch;
