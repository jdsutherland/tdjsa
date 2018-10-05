const expect = require('chai').expect;
const db = require('../../db');

describe('db-test', () => {
  it('should pass this canary test', () => {
    expect(true).to.eql(true);
  });

  it('get should return null connection by default', () => {
    expect(db.get()).to.be.null;
  });

  describe('close', () => {
    it('close should set connection to null', () => {
      db.close();

      expect(db.connection).to.be.null;
    });

    it('close should close existing connection', (done) => {
      db.connection = { close: () => { done(); } };
      db.close();

      expect(db.connection).to.be.null;
    });

  });

  describe('connect', function() {
    it('connect should set the connection given valid db name', (done) => {
      const callback = (err) => {
        expect(err).to.eql(null);
        expect(db.get().databaseName).to.be.eql('todotest');
        db.close();
        done();
      };

      db.connect('mongodb://localhost/todotest', callback);
    });

    it('connect should reject invalid schema', (done) => {
      const callback = (err) => {
        expect(err).to.be.instanceof(Error);
        done();
      }
      db.connect('BADSCHEMA://localhost/todotest', callback);
    });

    it('connect should reject invalid name', (done) => {
      const callback = (err) => {
        expect(err).to.be.instanceof(Error);
        done();
      }
      db.connect('mongodb', callback);
    });
  });

});
