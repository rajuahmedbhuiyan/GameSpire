const mongoose = require('mongoose');

// Connect to MongoDB

const connectDB =  (connectStr) => {
    return mongoose.connect(connectStr)
};

module.exports = connectDB;