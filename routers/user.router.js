const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { checkAuth } = require('../middlewares/auth.middleware');

router.get('/', checkAuth, userController.list);

module.exports = router;