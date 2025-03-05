"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const documentModel_1 = require("./models/documentModel");
const findOrCreate_1 = require("./actions/findOrCreate");
const config_1 = require("./config/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
const PORT = config_1.config.port;
const URL = config_1.config.url;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield mongoose_1.default.connect(URL);
    if (res) {
        console.log("Connected to MongoDB");
    }
});
connectDB();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.config.originURL,
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    console.log("User connected!");
    socket.on('get-document', (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield (0, findOrCreate_1.findOrCreate)(documentId);
        socket.join(documentId);
        socket.emit("load-document", document === null || document === void 0 ? void 0 : document.data);
        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
        socket.on("save-document", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield documentModel_1.documentModel.updateOne({ _id: documentId }, { data });
        }));
    }));
    socket.on('disconnect', () => {
        console.log("someone disconnected");
    });
});
server.listen(PORT, () => {
    console.log(`Server started successfully on port: ${PORT}`);
});
