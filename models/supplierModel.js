const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode supplier wajib diisi'],
    unique: true,
    uppercase: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'Nama supplier wajib diisi'],
    trim: true
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);