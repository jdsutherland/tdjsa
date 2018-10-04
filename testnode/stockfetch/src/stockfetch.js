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
    const isCorrectFormat = function(str) {
      return str.trim().length !== 0 && str.indexOf(' ') < 0;
    };

    return tickers.split('\n').filter(isCorrectFormat);
  };

  this.processTickers = tickers => {
    this.tickersCount = tickers.length;
    tickers.forEach(ticker => this.getPrice(ticker));
  };

  this.getPrice = ticker => {
  }

  this.tickersCount = 0;
};

module.exports = Stockfetch;
