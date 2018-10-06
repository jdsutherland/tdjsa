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

  it('should register URI /:id for get', () => {
    expect(router.get.calledWith('/:id', sandbox.match.any)).to.eql(true);
  });

  it("get /:validId handler should call model's get & return a task" , (done) => {
    const sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016};

    sandbox.stub(task, 'get', (id, callback) => {
      expect(id).to.eql(req.params.id);
      callback(null, sampleTask)
    });

    const req = {params: {id: 1}};
    const res = stubResSend(sampleTask, done);

    const registeredCallback = router.get.secondCall.args[1];
    registeredCallback(req, res);
  });

  it("get /:invalidId handler should call model's get & return {}" , (done) => {
    const sampleTask = {};

    sandbox.stub(task, 'get', (id, callback) => {
      expect(id).to.eql(req.params.id);
      callback(null, null)
    });

    const req = {params: {id: 2319}};
    const res = stubResSend(sampleTask, done);

    const registeredCallback = router.get.secondCall.args[1];
    registeredCallback(req, res);
  });

  it('should register URI / for post', () => {
    expect(router.post.calledWith('/', sandbox.match.any)).to.eql(true);
  });

  it("post handler should call model's add & return success message" , (done) => {
    const sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016};

    sandbox.stub(task, 'add', (newTask, callback) => {
      expect(newTask).to.eql(sampleTask);
      callback(null, sampleTask)
    });

    const req = { body: sampleTask };
    const res = stubResSend("task added", done);

    const registeredCallback = router.post.firstCall.args[1];
    registeredCallback(req, res);
  });

  it("post handler should return error message on failure" , (done) => {
    const sampleTask = {};

    sandbox.stub(task, 'add', (newTask, callback) => {
      expect(newTask).to.eql(sampleTask);
      callback(new Error('unable to add task'));
    });

    const req = { body: sampleTask };
    const res = stubResSend('unable to add task', done);

    const registeredCallback = router.post.firstCall.args[1];
    registeredCallback(req, res);
  });

  it('should register URI / for delete', () => {
    expect(router.delete.calledWith('/:id', sandbox.match.any)).to.eql(true);
  });

  it("delete :validId handler should call model's delete & return success message" , (done) => {
    sandbox.stub(task, 'delete', (id, callback) => {
      expect(id).to.eql(req.params.id);
      callback(null)
    });

    const req = { params: {id: 1}};
    const res = stubResSend("task deleted", done);

    const registeredCallback = router.delete.firstCall.args[1];
    registeredCallback(req, res);
  });

  it("delete :invalidId handler should return error message" , (done) => {
    sandbox.stub(task, 'delete', (id, callback) => {
      expect(id).to.eql(req.params.id);
      callback(new Error('unable to delete taks with id: 666'))
    });

    const req = { params: {id: 666}};
    const res = stubResSend('unable to delete taks with id: 666', done);

    const registeredCallback = router.delete.firstCall.args[1];
    registeredCallback(req, res);
  });
});
