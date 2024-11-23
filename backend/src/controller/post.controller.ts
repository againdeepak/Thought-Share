import { Request, Response } from "express";
import postModel from "../models/postModel";
import likeModel from "../models/likeModel";
import commentModel from "../models/commentModel";
import userModel from "../models/userModel";
import { Document } from "mongoose";
interface createPostRequest extends Request {
    userId?: string;
    body: {
        photo: string;
        description: string;
        location: string;
        postBy: string;
        currUserPic:string;
    }
}
export const createPost = async (req: createPostRequest, res: Response): Promise<any> => {
    try {

        // Find the current User...
        const currUser = await userModel.findOne({ _id: req.userId });
        const { photo, description, location } = req.body;
        
        
        const post = new postModel({
            photo,
            description,
            location,
            postBy: currUser?.userName,
            // add the image of current user
            currUserPic:currUser?.userPic
        })
        const newPost = await post.save();
        // Push inside the current User's posts array...
        await userModel.findByIdAndUpdate(
            { _id: req.userId },
            { $push: { posts: newPost._id } }
        )
        return res.status(200).json({ message: "Post created successfully", newPost });
    } catch (err) {
        console.error("Error in createPost controller", err);
        return res.status(500).json({ error: "Error in createPost controller" })
    }
}


export const getAllPosts = async (req: Request, res: Response): Promise<any> => {
    try {
        const allPosts = await postModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ allPosts });
    } catch (err) {
        console.error("Error in getAllPost controller", err);
        return res.status(500).json({ error: "Error in getAllPost controller" })
    }
}

// Define the Post structure
interface postModel {
    _id: string;
    photo: string;
    description: string;
    location: string;
}

// Define the User structure, where posts are populated as PostModel objects
interface User extends Document {
    posts: postModel[] // Array of populated post objects
}

// Define the extended Request interface for user posts
interface UserPostsRequest extends Request {
    userId?: string;
}

export const userPosts = async (req: UserPostsRequest, res: Response): Promise<any> => {
    try {
        // Fetch user by ID and populate posts with PostModel type
        const userPosts = await userModel
            .findById(req.userId).select("-_id posts")
            .populate<{ posts: postModel[] }>("posts");

        // If user is not found
        if (!userPosts) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the populated posts
        return res.status(200).json({ userPosts });
    } catch (err) {
        console.error("Error in userPosts controller:", err);
        return res.status(500).json({ error: "Error in userPosts controller" });
    }
};
interface EditPostRequest extends Request {
    userId?: string;
    body: {
        photo: string;
        description: string;
        location: string;
    }
    params: {
        id: string;
    }
}
export const editPost = async (req: EditPostRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;
        const { photo, description, location } = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(postId, {
            photo: photo,
            description: description,
            location: location,
        }, { new: true });

        return res.status(200).json({ message: "Post has been updated", updatedPost });
    } catch (err) {
        console.error("Error in editPost controller:", err);
        return res.status(500).json({ error: "Error in editPost controller" });

    }
}

interface GetPostRequest extends Request {
    params: {
        id: string;
    }
}
export const getPost = async (req: GetPostRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;
        const postData = await postModel.findOne({ _id: postId })
        return res.status(200).json({ postData });
    } catch (err) {
        console.error("Error in getPost controller:", err);
        return res.status(500).json({ error: "Error in getPost controller" });
    }
}

interface DeletePostRequest extends Request {
    userId?: string;
    params: {
        id: string;
    }
}
export const deletePost = async (req: DeletePostRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;
        const deletePost = await postModel.findByIdAndDelete(postId);
        // Also delete from the User's Posts
        await userModel.findByIdAndUpdate(
            { _id: req.userId },
            { $pull: { posts: postId } }
        )
        // Delete all comments associated with the post
        await commentModel.deleteMany({ postId });

        // Delete all likes associated with the post
        await likeModel.deleteMany({ postId });
        return res.status(200).json({ message: "Post delete", deletePost });
    } catch (err) {
        console.error("Error in deletePost controller:", err);
        return res.status(500).json({ error: "Error in deletePost controller" });
    }
}