// db.js
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/first-proj')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
};

module.exports = connectDB;
