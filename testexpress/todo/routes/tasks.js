const express = require('express');
const router = express.Router();

const task = require('../models/task');

router.get('/', (req, res, next) => {
  task.all((err, tasks) => {
    res.send(tasks);
  })
});

router.get('/:id', (req, res, next) => {
  task.get(req.params.id, (err, task) => {
    task ? res.send(task) : res.send({});
  })
});

module.exports = router;
