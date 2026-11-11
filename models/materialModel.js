const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode material wajib diisi'],
    unique: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'Nama material wajib diisi'],
    trim: true
  },
  harga: {
    type: Number,
    required: [true, 'Harga material wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  stok: {
    type: Number,
    required: [true, 'Stok material wajib diisi'],
    min: [0, 'Stok tidak boleh negatif']
  },
  satuan: {
    type: String,
    required: [true, 'Satuan wajib diisi'],
    trim: true
  },

  // Embedding
  spesifikasi: {
    ukuran: String,
    bahan: String
  },

  // Referencing
  kategoriId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kategori',
    required: [true, 'Kategori wajib dipilih']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);