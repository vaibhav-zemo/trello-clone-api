const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const projectRouter = require('./project.router');
const taskRouter = require('./task.router');
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/users', userRouter);

module.exports = router;