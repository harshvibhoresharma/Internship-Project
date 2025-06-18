const express = require('express');
const app = express();
const PORT = 3000;
const connectedDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

connectedDB();

app.use('/user', userRoutes); 

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
