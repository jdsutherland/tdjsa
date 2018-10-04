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

  it('processTickers should call getPrice for each ticker symbol', () => {
    const stockfetchMock = sandbox.mock(stockfetch);
    stockfetchMock.expects('getPrice').withArgs('A');
    stockfetchMock.expects('getPrice').withArgs('B');
    stockfetchMock.expects('getPrice').withArgs('C');

    stockfetch.processTickers(['A', 'B', 'C'])
    stockfetchMock.verify();
  });

  it('processTickers should save tickers count', () => {
    sandbox.stub(stockfetch, 'getPrice');

    stockfetch.processTickers(['A', 'B', 'C'])
    expect(stockfetch.tickersCount).to.eql(3);
  });

  it('getPrice should call get on http with valid URL', () => {
    const httpStub = sandbox.stub(stockfetch.http, 'get', function(url) {
      expect(url).to.eql('http://ichart.finance.yahoo.com/table.csv?s=GOOG');
      done();
      return { on: function() {} };
    });

    stockfetch.getPrice('GOOG');
  });

  it('getPrice should send a response handler to get', (done) => {
    const aHandler = function() {};

    sandbox.stub(stockfetch.processResponse, 'bind')
      .withArgs(stockfetch, 'GOOG')
      .returns(aHandler)

    const httpStub = sandbox.stub(stockfetch.http, 'get', function(url, handler) {
      expect(handler).to.eql(aHandler);
      done();
      return { on: function() {} };
    })

    stockfetch.getPrice('GOOG');
  });

  it('getPrice should register handler for failure to reach host', (done) => {
    const errHandler = function() {};

    sandbox.stub(stockfetch.processHttpError, 'bind')
      .withArgs(stockfetch, 'GOOG')
      .returns(errHandler)

    const onStub = function(event, handler) {
      expect(event).to.eql('error');
      expect(handler).to.eql(errHandler);
      done();
    };
    sandbox.stub(stockfetch.http, 'get').returns({ on: onStub });

    stockfetch.getPrice('GOOG');
  });

  it('processResponse should call parsePrice with valid data', () => {
    let dataFunction;
    let endFunction;

    const response = {
      statusCode: 200,
      on: function(event, handler) {
        if (event === 'data') dataFunction = handler;
        if (event === 'end') endFunction = handler;
      }
    };

    const parsePriceMock = sandbox.mock(stockfetch)
      .expects('parsePrice').withArgs('GOOG', 'some data')

    stockfetch.processResponse('GOOG', response);
    dataFunction('some ');
    dataFunction('data');
    endFunction();

    parsePriceMock.verify();
  });

  it('processResponse should call processError if response failed', () => {
    const response = { statusCode: 404 };

    const parsePriceMock = sandbox.mock(stockfetch)
      .expects('processError').withArgs('GOOG', 404);

    stockfetch.processResponse('GOOG', response);

    parsePriceMock.verify();
  });

  it('processResponse should call processError only if response failed', () => {
    const response = {
      statusCode: 200,
      on: function() {}
    };

    const parsePriceMock = sandbox.mock(stockfetch)
                                  .expects('processError')
                                  .never()

    stockfetch.processResponse('GOOG', response);

    parsePriceMock.verify();
  });

  it('processHttpError should call processError with error details', () => {
    const error = { code: '...error code...' };

    const parsePriceMock = sandbox.mock(stockfetch)
      .expects('processError').withArgs('GOOG', '...error code...');

    stockfetch.processHttpError('GOOG', error);

    parsePriceMock.verify();
  });

});
