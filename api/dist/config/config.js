"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _config = {
    port: process.env.PORT || 7890,
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/textDB",
    originURL: process.env.ORIGIN_URL || "http://localhost:5173"
};
const config = Object.freeze(_config);
exports.config = config;
