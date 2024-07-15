const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { checkAuth } = require('../middlewares/auth.middleware');

router.post('/', checkAuth, projectController.create);
router.get('/', checkAuth, projectController.list);
router.get('/:id', checkAuth, projectController.show);
router.put('/:id', checkAuth, projectController.update);
router.delete('/:id', checkAuth, projectController.remove);

module.exports = router;