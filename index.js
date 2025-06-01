require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API running...');
});

// Mount router at /api (NOT /api/routes)
const routeRoutes = require('./routes/routeRoutes');
app.use('/api', routeRoutes);  // Mount at /api

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
