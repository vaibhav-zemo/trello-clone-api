const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);
router.get('/:id', taskController.show);

module.exports = router;