"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema using the IUser interface
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        { type: mongoose_1.default.Types.ObjectId },
        { ref: "postModel" },
    ]
}, { timestamps: true });
// Define the userModel type
const userModel = mongoose_1.default.model("userModel", userSchema);
exports.default = userModel;
