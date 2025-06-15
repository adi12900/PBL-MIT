const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/db'); // Make sure db.js exports the pool

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test DB Connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
    process.exit(1);
  } else {
    console.log(`✅ Connected to DB '${process.env.DB_NAME}' at`, result.rows[0].now);
  }
});

// ✅ Basic route
app.get('/', (req, res) => {
  res.send('🚀 PBLConnect backend is running!');
});

// Listen on port from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
