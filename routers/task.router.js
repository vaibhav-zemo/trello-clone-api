const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { checkAuth } = require('../middlewares/auth.middleware');

router.post('/', checkAuth, taskController.create);
router.put('/:id', checkAuth, taskController.update);
router.delete('/:id', checkAuth, taskController.remove);
router.get('/:id', checkAuth, taskController.show);
router.get('/', checkAuth, taskController.list);

module.exports = router;