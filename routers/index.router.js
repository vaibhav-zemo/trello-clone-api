const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const projectRouter = require('./project.router');
const taskRouter = require('./task.router');

router.use('/auth', authRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);

module.exports = router;