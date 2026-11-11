const Kategori = require('../models/kategoriModel');

exports.create = async (req, res) => {
  const kategori = await Kategori.create(req.body);
  res.status(201).json(kategori);
};

exports.getAll = async (req, res) => {
  const data = await Kategori.find();
  res.json(data);
};