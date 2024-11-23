"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: true,
        min: [5, "Put something inside this"]
    },
    commentBy: {
        type: String,
        required: true,
        // Done by req.CurrUser
    }
}, { timestamps: true });
const commentModel = mongoose_1.default.model("commentModel", commentSchema);
exports.default = commentModel;
