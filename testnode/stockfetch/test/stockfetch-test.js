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
    const parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

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

  it('read should return error if given file is empty', (done) => {
    const onError = function(err) {
      expect(err).to.eql('File tickers.txt has invalid content');
      done();
    };

    sandbox.stub(stockfetch, 'parseTickers').withArgs('').returns([]);

    sandbox.stub(fs, 'readFile', function(fileName, callback) {
      callback(null, '');
    });

    stockfetch.readTickersFile('tickers.txt', onError);
  });

  it('parseTickers should return tickers', () => {
    const rawData = 'GOOG\nAAPL\nORCL\nMSFT';
    const parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

    expect(stockfetch.parseTickers(rawData)).to.eql(parsedData);
  });

  it('parseTickers should return an empty array for empty content', () => {
    const rawData = '';
    const parsedData = [];

    expect(stockfetch.parseTickers(rawData)).to.eql(parsedData);
  });

  it('parseTickers should return an empty array for white-space', () => {
    const rawData = ' ';
    const parsedData = [];

    expect(stockfetch.parseTickers(rawData)).to.eql(parsedData);
  });

  it('parseTickers should ignore unexpected format in content', () => {
    const rawData = 'AAPL   \nBla h\nGOOG\n\n   ';
    const parsedData = ['GOOG'];

    expect(stockfetch.parseTickers(rawData)).to.eql(parsedData);
  });

});
