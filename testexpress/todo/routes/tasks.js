const express = require('express');
const router = express.Router();

const task = require('../models/task');

router.get('/', (req, res, next) => {
  task.all((err, tasks) => {
    res.send(tasks);
  })
});

module.exports = router;
