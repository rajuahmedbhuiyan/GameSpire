// src/routes/chatRoutes.js
const express = require('express');
const { saveMessage, getMessages } = require('../controller/chatController');
const router = express.Router();

router.post('/messages', saveMessage);
router.get('/messages', getMessages);

module.exports = router;
