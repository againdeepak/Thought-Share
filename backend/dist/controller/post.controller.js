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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo, description, location, postBy } = req.body;
        const post = new postModel_1.default({
            photo, description, location, postBy
        });
        const newPost = yield post.save();
        return res.status(200).json({ message: "Post created successfully", newPost, data: req.userId });
    }
    catch (err) {
        console.error("Error in createPost controller", err);
        return res.status(500).json({ error: "Error in createPost controller" });
    }
});
exports.createPost = createPost;
