"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentModel = void 0;
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    data: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const documentModel = (0, mongoose_1.model)('Document', documentSchema);
exports.documentModel = documentModel;
