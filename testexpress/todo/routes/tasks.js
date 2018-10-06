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

router.post('/', (req, res, next) => {
  task.add(req.body, err => {
    err ? res.send(err.message) : res.send("task added");
  })
});

router.delete('/:id', (req, res, next) => {
  task.delete(req.params.id, err => {
    err ? res.send(err.message) : res.send("task deleted");
  })
});

module.exports = router;
