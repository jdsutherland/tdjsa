const fs = require('fs-promise');

module.exports = function(fileName) {
  const onSuccess = function(data) {
    return Promise.resolve(data.toString().split('\n').length);
  };

  const onError = function(err) {
    return Promise.reject(new Error('unable to open file ' + fileName));
  };

  return fs.readFile(fileName)
           .then(onSuccess)
           .catch(onError);
};
