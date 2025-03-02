"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
const PORT = 7890;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    console.log("User connected!");
    socket.on('disconnect', () => {
        console.log("someone disconnected");
    });
    socket.on('get-document', (documentId) => {
        const data = "";
        socket.join(documentId);
        socket.emit("load-document", data);
        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
    });
});
server.listen(PORT, () => {
    console.log(`Server started successfully on port: ${PORT}`);
});
