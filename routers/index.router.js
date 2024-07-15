const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');

router.use('/auth', authRouter);

module.exports = router;