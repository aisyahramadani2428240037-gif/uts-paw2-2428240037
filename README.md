# UTS PAW2 - API Toko Bangunan

Aisyah Ramadani (2428240037) - SI5B - Topik 08. Toko Bangunan

## Cara Menjalankan

1. Jalankan `npm install`.

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/uts_paw2_2428240037
CORS_ORIGIN=http://localhost:5173
```

3. Pastikan MongoDB berjalan, lalu jalankan `npm start`.

## Daftar Endpoint

| Method | Endpoint | Keterangan | Status |
|---|---|---|---|
| POST | /supplier | Menambah supplier `{ kode, nama }` | 201 |
| GET | /supplier | Menampilkan semua supplier | 200 |
| POST | /material | Menambah material | 201 |
| GET | /material | Menampilkan semua material | 200 |
| GET | /material?satuan=batang | Filter satuan (sama persis) | 200 |
| GET | /material?sort=stok | Urut menaik berdasarkan field | 200 |
| GET | /material/:id | Detail material dengan populate supplier | 200 / 404 / 400 |

Filter dan sort dapat digabung, contohnya `/material?satuan=batang&sort=stok`.

## Alasan Desain Data Model

- **lokasiRak (embedding):** lokasi rak hanya milik satu material dan selalu
  dibaca bersama materialnya, sehingga cukup satu query tanpa join. Datanya
  kecil dan tidak diakses sendiri, jadi tidak perlu `_id`.
- **Supplier (referencing):** satu supplier memasok banyak material dan
  datanya diakses sendiri lewat `/supplier`. Referensi menghindari duplikasi
  data dan memudahkan pembaruan di satu tempat. Datanya dimuat dengan
  populate saat detail material dibaca.