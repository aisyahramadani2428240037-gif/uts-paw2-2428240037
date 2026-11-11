const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode kategori wajib diisi'],
    unique: true,
    uppercase: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'Nama kategori wajib diisi'],
    trim: true
  }
});

module.exports = mongoose.model('Kategori', kategoriSchema);