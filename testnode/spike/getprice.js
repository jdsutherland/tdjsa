const http = require('http');

const getPriceTrial = function(ticker) {
  // API no longer exists
  http.get(`http://ichart.finance.yahoo.com/table.csv?s=${ticker}`,
  function(response) {
    if (response.statusCode === 200) {
      let data = '';
      const getChunk = chunk => { data += chunk; };
      response.on('data', getChunk)
      response.on('end', function() {
        console.log(`received data for ${ticker}\n${data}`);
      })
    } else {
      console.log(`${ticker} - error getting data : ${response.statusCode}`);
    }
  }).on('error', function(err) {
      console.log(`${ticker} - error getting data : ${err.code}`);
  });
};

getPriceTrial('GOOG');
getPriceTrial('INVALID');
// also try running after disconnect from network
