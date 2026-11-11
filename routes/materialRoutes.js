const express = require('express');
const router = express.Router();

const materialController = require('../controller/materialController');

router.post('/', materialController.create);
router.get('/', materialController.getAll);
router.get('/:id', materialController.getById);

module.exports = router;
