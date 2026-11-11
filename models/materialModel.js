const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'SKU wajib diisi'],
    unique: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true
  },
  stok: {
    type: Number,
    required: [true, 'Stok wajib diisi'],
    min: [0, 'Stok tidak boleh negatif']
  },
  satuan: {
    type: String,
    required: [true, 'Satuan wajib diisi'],
    trim: true
  },

  // Embedding (subdocument tanpa _id)
  lokasiRak: new mongoose.Schema(
    {
      blok: String,
      nomor: String
    },
    { _id: false }
  ),

  // Referencing
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Supplier wajib dipilih']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);