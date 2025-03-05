import dotenv from 'dotenv';

dotenv.config();

const _config = {
    port: process.env.PORT || 7890,
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/textDB",
    originURL: process.env.ORIGIN_URL || "http://localhost:5173"
}

const config = Object.freeze(_config);

export { config };