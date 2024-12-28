"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the comment schema with type annotations and correct validation
const commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [5, "Please put something meaningful in the comment"],
    },
    commentBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "userModel",
        required: true, // Specify required if applicable
    },
}, { timestamps: true });
// Create and export the model
const commentModel = mongoose_1.default.model("commentModel", commentSchema);
exports.default = commentModel;
