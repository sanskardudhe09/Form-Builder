const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({origin: 'https://form-builder-nine-omega.vercel.app/'}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/forms', formRoutes);

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
