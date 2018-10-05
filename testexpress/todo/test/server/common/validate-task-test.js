const expect = require('chai').expect;
const validateTask = require('../../../public/javascripts/common/validate-task');

describe('validate-task-test', () => {
  let sampleTask;

  const expectFailForProperty = (property, value) => {
    sampleTask[property] = value;
    expect(validateTask(sampleTask)).to.eql(false);
  };

  beforeEach(function() {
    sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016};
  });

  it('should return true for valid task', () => {
    expect(validateTask(sampleTask)).to.eql(true);
  });

  it('should return false for undefined task', () => {
    expect(validateTask()).to.eql(false);
  });

  it('should return false for null task', () => {
    expect(validateTask(null)).to.eql(false);
  });

  it('should return false for undefined name', () => {
    expectFailForProperty('name');
  });

  it('should return false for null name', () => {
    expectFailForProperty('name', null);
  });

  it('should return false for empty name', () => {
    expectFailForProperty('name', '');
  });

  ['month', 'day', 'year'].forEach(property => {
    it('should return false for undefined ' + property, function() {
      expectFailForProperty(property);
    });

    it('should return false for null ' + property, function() {
      expectFailForProperty(property, null);
    });

    it('should return false for non number ' + property, function() {
      expectFailForProperty(property, 'text');
    });
  });

});

