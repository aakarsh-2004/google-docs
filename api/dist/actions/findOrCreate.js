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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreate = void 0;
const documentModel_1 = require("../models/documentModel");
const defaultValue = "";
const findOrCreate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        return;
    const document = yield documentModel_1.documentModel.findOne({ _id: id });
    if (!document) {
        const newDocument = yield documentModel_1.documentModel.create({ _id: id, data: defaultValue });
        return newDocument;
    }
    else {
        return document;
    }
});
exports.findOrCreate = findOrCreate;
