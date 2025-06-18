const express = require('express');
const app = express();
const PORT = 3000;

const connectedDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logFiles = require('./middleware/logger');

app.use(express.json());

app.use(logFiles('logs.txt')); 

connectedDB()
  .then(() => {
    console.log('MongoDB connected');

    app.use('/user', userRoutes);

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:', err);
  });
