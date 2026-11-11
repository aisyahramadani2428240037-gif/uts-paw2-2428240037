const Supplier = require('../models/supplierModel');

exports.create = async (req, res) => {
  const { kode, nama } = req.body || {};
  const supplier = await Supplier.create({ kode, nama });
  res.status(201).json(supplier);
};

exports.getAll = async (req, res) => {
  const data = await Supplier.find();
  res.json(data);
};