const express = require('express');
const app = express();
const PORT = 3000;

const connectedDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logFiles = require('./middleware/logger'); // ⬅️ your custom logger

// Built-in body parser
app.use(express.json());

// Custom middleware to log requests
app.use(logFiles('logs.txt')); // ⬅️ logs into logs.txt

// Connect to MongoDB and start the server only after successful connection
connectedDB()
  .then(() => {
    console.log('✅ MongoDB connected');

    // Mount user routes
    app.use('/user', userRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
