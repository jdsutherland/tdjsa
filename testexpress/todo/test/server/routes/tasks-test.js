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

});
