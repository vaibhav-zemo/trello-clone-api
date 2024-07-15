const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const projectRouter = require('./project.router');

router.use('/auth', authRouter);
router.use('/projects', projectRouter);

module.exports = router;