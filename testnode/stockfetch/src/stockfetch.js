class StockFetch {
  readTickersFile(filename, onError) {
    onError(`Error reading file: ${filename}`);
  }
}

module.exports = StockFetch;
