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
    userPic: {
        type: String,
        default: "https://res.cloudinary.com/dxwcmq53m/image/upload/v1731397366/UploadPic_uhmgsf.png"
    },
    posts: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "postModel", // Make sure this matches the name of your post model
        },
    ],
}, { timestamps: true });
// Define the userModel type
const userModel = mongoose_1.default.model("userModel", userSchema);
exports.default = userModel;
