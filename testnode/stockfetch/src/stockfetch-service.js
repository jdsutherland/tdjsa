const http = require('http');
const querystring = require('querystring');
const Stockfetch = require('./stockfetch');

const handler = (req, res) => {
  const symbolString = querystring.parse(req.url.split('?')[1]).s || '';

  if (symbolString !== '') {
    let stockfetch = new Stockfetch();
    const tickers = symbolString.split(',');

    stockfetch.reportCallback = (prices, errors) => {
      res.end(JSON.stringify({prices: prices, errors: errors}));
    }

    stockfetch.processTickers(tickers)
  } else {
    res.end('invalid query, use format ?s=SYM1,SYM2');
  }
};

http.createServer(handler).listen(3001);
