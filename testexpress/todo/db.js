const MongoClient = require('mongodb').MongoClient;

module.exports = {
  connection: null,

  get: function() { return this.connection; },

  close: function() {
    // TODO: close stuff
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  },

  connect: function(dbname, callback) {
    const cacheConnection = (err, db) => {
      this.connection = db;
      callback(null);
    };

    try {
      MongoClient.connect(dbname, cacheConnection);
    } catch (ex) {
      callback(ex);
    }
  },
};
