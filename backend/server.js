const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://form-builder-nine-omega.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies or authentication headers
};
app.use(cors(corsOptions));


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
  console.log(`Server running on port ${port}`);
});
