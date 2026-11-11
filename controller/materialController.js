const Material = require('../models/materialModel');
const { errorHttp } = require('../middlewares/errorHandler');

// POST /material - hanya field dari tabel topik yang diterima
exports.create = async (req, res) => {
  const { sku, nama, stok, satuan, lokasiRak, supplierId } = req.body || {};

  const material = await Material.create({
    sku,
    nama,
    stok,
    satuan,
    lokasiRak,
    supplierId
  });

  res.status(201).json(material);
};

// GET /material?satuan=...&sort=...
exports.getAll = async (req, res) => {
  const { satuan, sort } = req.query;

  const filter = {};
  if (typeof satuan === 'string') {
    filter.satuan = satuan;
  }

  let query = Material.find(filter);
  if (typeof sort === 'string' && sort) {
    query = query.sort({ [sort]: 1 });
  }

  res.json(await query);
};

// GET /material/:id
exports.getById = async (req, res) => {
  const data = await Material.findById(req.params.id)
    .populate('supplierId', 'kode nama');

  if (!data) {
    throw errorHttp(404, 'Data tidak ditemukan');
  }

  res.json(data);
};