const expect = require('chai').expect;
const sinon = require('sinon');
const express = require('express');

const task = require('../../../models/task');

describe('tasks routes tests', () => {
  let sandbox;
  let router;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    sandbox.stub(express, 'Router').returns({
      get: sandbox.spy(),
      post: sandbox.spy(),
      delete: sandbox.spy(),
    });

    // by requiring after stub, router uses stubbed methods
    router = require('../../../routes/tasks');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should register the URI / for get', () => {
    expect(router.get.calledWith('/', sandbox.match.any)).to.be.true;
  });

  const stubResSend = (expected, done) => {
    return { send: data => {
      expect(data).to.eql(expected);
      done();
    }};
  };

  it("get handler should call model's all & return result" , (done) => {
    const sampleTasks = [{name: 'a new task', month: 12, day: 10, year: 2016}];

    sandbox.stub(task, 'all', callback => {
      callback(null, sampleTasks)
    });

    const req = {};
    const res = stubResSend(sampleTasks, done);

    const registeredCallback = router.get.firstCall.args[1];
    registeredCallback(req, res);
  });

});
