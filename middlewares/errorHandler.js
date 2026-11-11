function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function notFoundHandler(req, res) {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
}

function errorHandler(err, req, res, next) {
  // Body JSON rusak
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // ID bukan ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID tidak valid' });
  }

  // Pelanggaran schema
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Data tidak valid',
      detail: Object.values(err.errors).map((e) => e.message)
    });
  }

  // Nilai unik bentrok
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Data sudah ada (nilai unik bentrok)' });
  }

  // Galat yang dilempar sengaja
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ message: err.message });
  }

  // Galat tak terduga
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };