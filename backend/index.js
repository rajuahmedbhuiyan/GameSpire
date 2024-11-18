const express = require('express');
const http = require('http'); // Import HTTP module
const { Server } = require('socket.io'); // Import Socket.IO
const connectDB = require('./db');
const routes = require('./routes');
const chatSocket = require('./sockets/chatSocket');
const app = express();
const port = 5000;

app.use(express.json());

// Set up HTTP server and attach it to Express
const server = http.createServer(app);

// Initialize Socket.IO and attach to the server
// Initialize Socket.IO with a custom path
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (adjust based on your requirements)
        methods: ["GET", "POST"]
    },
    path: '/chat' // Set the custom path
});


// Register Socket.IO handlers
io.on('connection', (socket) => {
    chatSocket(io, socket);
});


app.use(routes);

const uri = "mongodb+srv://mohammad:mohammad@firstcluster.wneczch.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster";

connectDB(uri)
    .then(() => {
        console.log('Database Connected');

        // Start the server
        server.listen(port, () => {
            console.log(`I'm listening on port ${port}!`);

            app.get('/', (req, res) => {
                res.send( "Connected to the server");
            });

        });
    })
    .catch((e) => console.log(e));
