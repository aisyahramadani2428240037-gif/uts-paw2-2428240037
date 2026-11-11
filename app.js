require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

// Import Routes
// Import Routes
const materialRoutes = require('./routes/materialRoutes');
const kategoriRoutes = require('./routes/kategoriRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

app.use('/material', materialRoutes);
app.use('/kategori', kategoriRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });