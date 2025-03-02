import { Server, Socket } from "socket.io";
import http from 'node:http';
import express from 'express';
import { Delta } from "quill";
import mongoose from 'mongoose';
import { documentModel } from "./models/documentModel";
import { findOrCreate } from "./actions/findOrCreate";
import { config } from "./config/config";

const app = express();
const server = http.createServer(app);
const PORT = config.port;
const URL = config.url;

const connectDB = async () => {
    const res =await mongoose.connect(URL);
    if(res) {
        console.log("Connected to MongoDB");
    }
}

connectDB();

const io = new Server(server, {
    cors: {
        origin: config.originURL,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket: Socket) => {
    console.log("User connected!");

    socket.on('get-document', async (documentId: string) => {
        const document = await findOrCreate(documentId);
        
        socket.join(documentId);
        socket.emit("load-document", document?.data);
        
        socket.on('send-changes', (delta: Delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
        
        socket.on("save-document", async (data) => {
            await documentModel.updateOne({ _id: documentId }, { data });
        })        
    });


    socket.on('disconnect', () => {
        console.log("someone disconnected");
    });
})


server.listen(PORT, () => {
    console.log(`Server started successfully on port: ${PORT}`);
})