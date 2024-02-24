import express from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('chat message', (message: string) => {
        io.emit('chat message', message);
    })
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Connected to ${PORT}`)
});