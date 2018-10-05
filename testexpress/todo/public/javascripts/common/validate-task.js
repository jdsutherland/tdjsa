const validateTask = task => {
  return true;
};

// allow both client & server side
(typeof module !== 'undefined') && (module.exports = validateTask);
