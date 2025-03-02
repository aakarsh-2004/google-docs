import { Server, Socket } from "socket.io";
import http from 'node:http';
import express from 'express';
import { Delta } from "quill";

const app = express();
const server = http.createServer(app);
const PORT = 7890;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket: Socket) => {
    console.log("User connected!");

    
    socket.on('disconnect', () => {
        console.log("someone disconnected");
    });
    
    socket.on('get-document', (documentId: string) => {
        const data = "";
        socket.join(documentId);
        socket.emit("load-document", data);

        socket.on('send-changes', (delta: Delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
    });
})


server.listen(PORT, () => {
    console.log(`Server started successfully on port: ${PORT}`);
})