// src/sockets/chatSocket.js   

const chat = require("../models/chat");


const activeUsers = new Map(); // Store active users: { socketId: userId }

module.exports = (io, socket) => {
    // Handle user joining (send userId when connecting)
    socket.on('user:join', (userId) => {
        activeUsers.set(socket.id, userId);
        console.log(`${userId} connected`, `Socket ID: ${socket.id}`);

        // Broadcast updated active users
        io.emit('user:active', Array.from(activeUsers.values()));
    });


    // Handle incoming messages
    socket.on('message', async (data) => {
        const { sender, receiver, message, timestamp } = data;

        // Save message to the database
        try {
            console.log({ data })
            console.log(`Message saved: ${message}`);
            // Emit the message to the receiver
            const receiverSocketId = [...activeUsers.entries()]
                .find(([, userId]) => {
                    return userId === receiver
                })?.[0];



            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', {
                    sender, message,
                    receiver,
                    timestamp
                });
                console.log(`Message sent to ${receiverSocketId}`);
            } else {
                console.warn(`Receiver not connected: ${receiver}`);
            }
        } catch (error) {
            console.error('Failed to save message:', error);
        }
    });


    // Handle user disconnection
    socket.on('disconnect', () => {
        const userId = activeUsers.get(socket.id);
        if (userId) {
            activeUsers.delete(socket.id);
            console.log(`${userId} disconnected`,);

            // Broadcast updated active users
            io.emit('user:active', Array.from(activeUsers.values()));
        }
    });
};
