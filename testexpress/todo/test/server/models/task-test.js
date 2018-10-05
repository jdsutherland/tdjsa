const expect = require('chai').expect;
const db = require('../../../db');
const ObjectId = require('mongodb').ObjectId;
const task = require('../../../models/task');

describe('task model tests', () => {
  let sampleTask;
  let sampleTasks;

  const id = idValue => { return new ObjectId(idValue); };

  before(done => {
    db.connect('mongodb://localhost/todotest', done);
  })

  after(() => {
    db.close();
  })

  beforeEach(done => {
    sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016};

    sampleTasks = [
      {_id: id('123412341240'), name: 'task1', month: 10, day: 1, year: 2016},
      {_id: id('123412341241'), name: 'task2', month: 11, day: 2, year: 2016},
      {_id: id('123412341242'), name: 'task3', month: 12, day: 3, year: 2016},
    ];

    db.get().collection('tasks').insert(sampleTasks, done);
  });

  afterEach(done => {
    db.get().collection('tasks').drop(done);
  });

  it('should pass this canary test', () => {
    expect(true).to.eql(true);
  });

  it('all should return all the tasks', (done) => {
    const callback = function(err, tasks) {
      expect(tasks).to.eql(sampleTasks);
      done();
    };

    task.all(callback);
  });

  it('get should return task with given id', (done) => {
    const callback = function(err, task) {
      expect(task.name).to.eql('task1');
      expect(task.month).to.eql(10);
      done();
    };

    task.get('123412341240', callback);
  });

  it('get should return null for non-existing task', (done) => {
    const callback = function(err, task) {
      expect(task).to.be.null
      done();
    };

    task.get('666666666666', callback);
  });

});
