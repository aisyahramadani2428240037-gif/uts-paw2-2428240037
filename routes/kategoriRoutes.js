const express = require('express');
const router = express.Router();

const kategoriController = require('../controller/kategoriController');

router.get('/', kategoriController.getAll);
router.post('/', kategoriController.create);

module.exports = router;
