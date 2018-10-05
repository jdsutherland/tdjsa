const validateTask = task => {
  if (task && task.name &&
    task.month && !isNaN(task.month) &&
    task.day   && !isNaN(task.day) &&
    task.year  && !isNaN(task.year))
    return true;

  return false;
};

// allow both client & server side
(typeof module !== 'undefined') && (module.exports = validateTask);
