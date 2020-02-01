const express = require('express');
const router  = express.Router();
const Task = require('../../models/Task')

/* GET form page */
router.get('/form', (req, res, next) => {
  res.render('form-views/form');
});

/* POST form page */
router.post('/form-input', (req, res, next) => {
  console.log("The form info: ", req.body);
  Task.create(req.body)
    .then(taskFromDB => {
      console.log("New task created :", {taskFromDB})
      res.redirect(`/task-details/${taskFromDB}`);
    })
    .catch(err => next(err));
});

/* View Task list */
router.get('/task-list', (req, res, next) => {
  Task.find()
    .then(tasksFromDB => {
      const data = {
        pageTitle: "Task List",
        tasks: tasksFromDB
      };
      res.render('task-views/task-list', data);
    })
    .catch(err => next(err))
});

/* View Details of Task */
router.get('/task-details/:taskId', (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(taskFromDB => {
      const data = {
        pageTitle: taskFromDB.title + " Details",
        task: taskFromDB
      };
      res.render('task-views/task-details', data)
    })
    .catch(err => next(err));
});

module.exports = router;