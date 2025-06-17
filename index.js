const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const connectedDB=require('./db');
const user = require('./user');
app.use(express.json())
connectedDB();
app.listen(PORT,() => {
    console.log(`server running at http://localhost:${PORT}`);
})
