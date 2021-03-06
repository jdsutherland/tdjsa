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

  this.parsePrice = (ticker, data) => {
    const price = data.split('\n')[1].split(',').pop();
    this.prices[ticker] = price;
    this.printReport();
  }

  this.printReport = () => {
    // TODO: printing
    if (this.tickersCount ===
      Object.keys(this.prices).length + Object.keys(this.errors).length) {
      this.reportCallback(this.sortData(this.prices), this.sortData(this.errors));
    }
  };

  this.processError = (ticker, error) => {
    this.errors[ticker] = error;
    this.printReport();
  };

  this.sortData = (data) => {
    const toArray = (key) => { return [key, data[key]]; }
    return Object.keys(data).sort().map(toArray);
  }

  this.reportCallback = () => {};

  this.getPriceForTickers = (filename, displayFn, errorFn) => {
    this.reportCallback = displayFn;
    this.readTickersFile(filename, errorFn);
  }

  this.tickersCount = 0;

  this.http = http;
  this.prices = {};
  this.errors = {};
};

module.exports = Stockfetch;
