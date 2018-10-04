const fs = require('fs');
const http = require('http');

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

  this.getPrice = symbol => {
    const url = `http://ichart.finance.yahoo.com/table.csv?s=${symbol}`;
    this.http.get(url, this.processResponse.bind(this, symbol))
      .on('error', this.processHttpError.bind(this, symbol))
  }

  this.processResponse = (symbol, response) => {
    if (response.statusCode === 200) {
      let data = '';
      response.on('data', chunk => { data += chunk; });
      response.on('end', () => { this.parsePrice(symbol, data); });
    } else {
      this.processError(symbol, response.statusCode);
    }
  };

  this.processHttpError = (symbol, error) => {
    this.processError(symbol, error.code);
  }

  this.parsePrice = function() {};
  this.processError = function() {};

  this.tickersCount = 0;

  this.http = http;
};

module.exports = Stockfetch;
