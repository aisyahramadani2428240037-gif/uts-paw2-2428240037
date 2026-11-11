const express = require('express');
const router = express.Router();

const materialController = require('../controller/materialController');

// POST - Menambahkan material
router.post('/', materialController.create);

// GET - Menampilkan seluruh material (bisa filter satuan dan sort)
router.get('/', materialController.getAll);

// GET - Menampilkan material berdasarkan ID
router.get('/:id', materialController.getById);

module.exports = router;