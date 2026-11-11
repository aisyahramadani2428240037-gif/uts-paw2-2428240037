const express = require('express');
const router = express.Router();

const supplierController = require('../controller/supplierController');

// POST - Menambahkan supplier
router.post('/', supplierController.create);

// GET - Menampilkan seluruh supplier
router.get('/', supplierController.getAll);

module.exports = router;