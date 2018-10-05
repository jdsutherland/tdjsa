const db = require('../db');
const validateTask = require('../public/javascripts/common/validate-task');
const ObjectId = require('mongodb').ObjectId;

const collectionName = 'tasks';

module.exports = {
  all: function(callback) {
    db.get().collection(collectionName).find().toArray(callback);
  },

  get: function(taskId, callback) {
    db.get().collection(collectionName)
      .find({'_id': new ObjectId(taskId)}).limit(1).next(callback);
  },

  add: function(newTask, callback) {
    const found = (err, task) => {
      if (task) {
        callback(new Error('duplicate task'));
      } else {
        db.get().collection(collectionName).insertOne(newTask, callback);
      }
    };

    if (this.validate(newTask)) {
      db.get().collection(collectionName).find(newTask).limit(1).next(found);
    } else {
      callback(new Error('unable to add task'))
    }
  },

  validate: validateTask,
};
