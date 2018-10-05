const db = require('../db');
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
};
