
// seed.js
// Mengisi basis data dengan 1 supplier dan 2 material.
// Data lama dihapus terlebih dahulu.

require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/supplierModel');
const Material = require('./models/materialModel');

const NIM = '2428240037';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Menghapus data lama
  await Material.deleteMany({});
  await Supplier.deleteMany({});

  // Membuat supplier
  const supplier = await Supplier.create({
    kode: 'SMN',
    nama: 'Semen Baturaja',
  });

  // Membuat material
  const material = await Material.insertMany([
    {
      sku: `MTR-${NIM}`,
      nama: 'Semen Baturaja 50kg',
      stok: 10,
      satuan: 'sak',
      lokasiRak: {
        blok: 'A',
        nomor: '1',
      },
      supplierId: supplier._id,
    },
    {
      sku: `MTR-${NIM}-02`,
      nama: 'Semen Baturaja 40kg',
      stok: 3,
      satuan: 'sak',
      lokasiRak: {
        blok: 'A',
        nomor: '2',
      },
      supplierId: supplier._id,
    },
  ]);

  console.log(
    `Seed selesai: 1 supplier, ${material.length} material`
  );

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err.message);
  await mongoose.disconnect();
  process.exit(1);
});
