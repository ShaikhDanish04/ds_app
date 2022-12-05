const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (payload) => {

        // let { message, phone_number } = payload;
        console.log('message: ' + payload);
        io.emit('chat message', payload);
    });

    socket.on('call', (payload) => {

        // let { message, phone_number } = payload;
        console.log('call: ' + payload);
        io.emit('call', payload);
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});