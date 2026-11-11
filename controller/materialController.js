const Material = require('../models/materialModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res) => {
  const material = await Material.create(req.body);
  res.status(201).json(material);
};

exports.getAll = async (req, res) => {
  const data = await Material.find();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Material.findById(req.params.id)
    .populate('kategoriId', 'kode nama');

  if (!data) {
    throw errorHttp(404, 'Data material tidak ditemukan');
  }

  res.json(data);
};