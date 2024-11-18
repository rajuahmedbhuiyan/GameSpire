// src/controllers/chatController.js
const Chat = require('../models/chat');

// Save a new message to the database
const saveMessage = async (req, res) => {
    try {
        const { sender, message } = req.body;
        const newMessage = await Chat.create({ sender, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};

// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { saveMessage, getMessages };
