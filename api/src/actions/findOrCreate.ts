import { documentModel } from "../models/documentModel";

const defaultValue = "";

export const findOrCreate = async (id: string) => {
    if(!id) return;

    const document = await documentModel.findOne({ _id: id });
    if(!document) {
        const newDocument = await documentModel.create({ _id: id, data: defaultValue });
        return newDocument;
    } else {
        return document;
    }
}