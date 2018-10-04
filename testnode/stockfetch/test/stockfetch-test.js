const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const Stockfetch = require('../src/stockfetch');

describe('Stockfetch tests', function() {
  let stockfetch;
  let sandbox;

  beforeEach(function() {
    stockfetch = new Stockfetch();
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should pass this canary test', function() {
    expect(true).to.be.true;
  });

  it('read should invoke error handler for invalid file', (done) => {
    const onError = function(err) {
      expect(err).to.eql('Error reading file: InvalidFile');
      done();
    };

    sandbox.stub(fs, 'readFile', function(fileName, callback) {
      callback(new Error('failed'));
    });

    stockfetch.readTickersFile('InvalidFile', onError);
  });

  it('read should invoke processTickers for valid file', (done) => {
    const rawData = 'GOOG\nAAPL\nORCL\nMSFT';
    const parsedData = ['GOOG, AAPL, ORCL, MSFT'];

    sandbox.stub(stockfetch, 'parseTickers')
      .withArgs(rawData).returns(parsedData);

    sandbox.stub(stockfetch, 'processTickers', function(data) {
      expect(data).to.eql(parsedData);
      done();
    });

    sandbox.stub(fs, 'readFile', function(fileName, callback) {
      callback(null, rawData);
    });

    stockfetch.readTickersFile('tickers.txt');
  });

});
