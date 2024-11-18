// src/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: { type: String, required: true }, // Sender's user ID
    receiver: { type: String, required: true }, // Receiver's user ID
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
