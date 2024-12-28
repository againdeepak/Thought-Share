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
exports.deletePost = exports.getPost = exports.editPost = exports.userPosts = exports.getAllPosts = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const likeModel_1 = __importDefault(require("../models/likeModel"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the current User...
        const currUser = yield userModel_1.default.findOne({ _id: req.userId });
        const { photo, description, location } = req.body;
        const post = new postModel_1.default({
            photo,
            description,
            location,
            postBy: currUser, // Refer to the current user for finding the Name and Profile pic..
        });
        const newPost = yield post.save();
        console.log(newPost);
        // Push inside the current User's posts array...
        yield userModel_1.default.findByIdAndUpdate({ _id: req.userId }, { $push: { posts: newPost._id } });
        return res.status(200).json({ message: "Post created successfully", newPost });
    }
    catch (err) {
        console.error("Error in createPost controller", err);
        return res.status(500).json({ error: "Error in createPost controller" });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield postModel_1.default.find().sort({ createdAt: -1 }).populate({
            path: "postBy",
            select: "userName userPic"
        });
        return res.status(200).json({ allPosts });
    }
    catch (err) {
        console.error("Error in getAllPost controller", err);
        return res.status(500).json({ error: "Error in getAllPost controller" });
    }
});
exports.getAllPosts = getAllPosts;
const userPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch user by ID and populate posts with PostModel type
        const userPosts = yield userModel_1.default
            .findById(req.userId).select("-_id userName userPic")
            .populate({
            path: "posts",
            populate: {
                path: "postBy",
                select: "userName userPic"
            }
        }).lean().exec();
        // If user is not found
        if (!userPosts) {
            return res.status(404).json({ error: "User has no posts" });
        }
        // Return the populated posts
        return res.status(200).json({ userPosts });
    }
    catch (err) {
        console.error("Error in userPosts controller:", err);
        return res.status(500).json({ error: "Error in userPosts controller" });
    }
});
exports.userPosts = userPosts;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: postId } = req.params;
        const { photo, description, location } = req.body;
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(postId, {
            photo: photo,
            description: description,
            location: location,
        }, { new: true });
        return res.status(200).json({ message: "Post has been updated", updatedPost });
    }
    catch (err) {
        console.error("Error in editPost controller:", err);
        return res.status(500).json({ error: "Error in editPost controller" });
    }
});
exports.editPost = editPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: postId } = req.params;
        const postData = yield postModel_1.default.findOne({ _id: postId });
        return res.status(200).json({ postData });
    }
    catch (err) {
        console.error("Error in getPost controller:", err);
        return res.status(500).json({ error: "Error in getPost controller" });
    }
});
exports.getPost = getPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: postId } = req.params;
        const deletePost = yield postModel_1.default.findByIdAndDelete(postId);
        // Also delete from the User's Posts
        yield userModel_1.default.findByIdAndUpdate({ _id: req.userId }, { $pull: { posts: postId } });
        // Delete all comments associated with the post
        yield commentModel_1.default.deleteMany({ postId });
        // Delete all likes associated with the post
        yield likeModel_1.default.deleteMany({ postId });
        return res.status(200).json({ message: "Post delete", deletePost });
    }
    catch (err) {
        console.error("Error in deletePost controller:", err);
        return res.status(500).json({ error: "Error in deletePost controller" });
    }
});
exports.deletePost = deletePost;
