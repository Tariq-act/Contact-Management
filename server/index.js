const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectDB } = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

// This for color change logs
require('colors');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use('/api/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server in running on port ${PORT}`.yellow.bold);
});
