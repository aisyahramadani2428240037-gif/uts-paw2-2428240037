// seed.js
// Mengisi basis data dengan 3 supplier dan 8 material.
// Aman dijalankan berulang: data lama dihapus dulu.
require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/supplierModel');
const Material = require('./models/materialModel');

const NIM = '2428240037';

const DATA_SUPPLIER = [
  { kode: 'SMG', nama: 'Semen Gresik' },
  { kode: 'KRS', nama: 'Krakatau Steel' },
  { kode: 'PRL', nama: 'Pralon' },
];

// kodeSupplier dipakai untuk mencari _id supplier setelah disimpan
const DATA_MATERIAL = [
  { nama: 'Semen Gresik 50kg', stok: 100, satuan: 'sak', blok: 'A', nomor: '1', kodeSupplier: 'SMG' },
  { nama: 'Semen Gresik 40kg', stok: 80, satuan: 'sak', blok: 'A', nomor: '2', kodeSupplier: 'SMG' },
  { nama: 'Besi Beton 10mm', stok: 200, satuan: 'batang', blok: 'B', nomor: '1', kodeSupplier: 'KRS' },
  { nama: 'Besi Beton 12mm', stok: 150, satuan: 'batang', blok: 'B', nomor: '2', kodeSupplier: 'KRS' },
  { nama: 'Pipa PVC 3 inci', stok: 60, satuan: 'batang', blok: 'C', nomor: '1', kodeSupplier: 'PRL' },
  { nama: 'Pipa PVC 4 inci', stok: 45, satuan: 'batang', blok: 'C', nomor: '2', kodeSupplier: 'PRL' },
  { nama: 'Paku 5cm', stok: 30, satuan: 'kg', blok: 'D', nomor: '1', kodeSupplier: 'KRS' },
  { nama: 'Kawat Bendrat', stok: 25, satuan: 'kg', blok: 'D', nomor: '2', kodeSupplier: 'KRS' },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Material.deleteMany({});
  await Supplier.deleteMany({});

  const supplier = await Supplier.insertMany(DATA_SUPPLIER);
  const idPerKode = Object.fromEntries(supplier.map((s) => [s.kode, s._id]));

  const material = DATA_MATERIAL.map((m, i) => ({
    sku: `MTR-${NIM}-${101 + i}`,
    nama: m.nama,
    stok: m.stok,
    satuan: m.satuan,
    lokasiRak: { blok: m.blok, nomor: m.nomor },
    supplierId: idPerKode[m.kodeSupplier],
  }));
  await Material.insertMany(material);

  console.log(`Seed selesai: ${supplier.length} supplier, ${material.length} material`);
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err.message); process.exit(1); });