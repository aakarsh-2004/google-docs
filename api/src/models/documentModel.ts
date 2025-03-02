import { model, Schema } from "mongoose";

const documentSchema = new Schema({
    _id: { type: String, required: true },
    data: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const documentModel = model('Document', documentSchema);

export { documentModel };