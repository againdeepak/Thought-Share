import likeModel from "../models/likeModel";
import postModel from "../models/postModel";
import { Request, Response } from "express";
import { Document, Schema } from "mongoose";
interface ILikeRequest extends Request {
    userId?: string;
    params: {
        id: string;
    }
}
export const doLike = async (req: ILikeRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;
        // Check if this user already liked or not...

        // Find the post and populate the `likes` field with the `likeModel` data
        const postWithLikes = await postModel.findById(postId).populate({
            path: "likes",
            model: "likeModel",
            match: { likeBy: req.userId },
            // Only include likes by the current user in the `likes` array
        });

        // Check if there are any likes in the populated array, meaning the user has already liked
        if (postWithLikes && postWithLikes.likes.length > 0) {
            console.log(postWithLikes);
            return res.status(401).json({
                message: "You have already liked it",
                alreadyLiked: postWithLikes.likes, // Provide the specific like document(s)
            });
        }

        const likedPost = new likeModel({
            likeStatus: true,
            likeBy: req.userId,
        })
        const response = await likedPost.save();
        // Push the like inside the current user...
        await postModel.findByIdAndUpdate(
            { _id: postId },
            { $push: { likes: response._id } }
        )
        return res.status(200).json({ message: "Liked the post", response });
    } catch (err) {
        console.error("Error in doLike controller", err);
        return res.status(500).json({ error: "Error in doLike controller" })

    }
}

interface IUnLikeRequest extends Request {
    userId?: string;
    params: {
        id: string;
    }
}

export const doUnLike = async (req: IUnLikeRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;

        // Find the post and populate `likes` with the specific like by `req.userId`
        const postWithLikes = await postModel.findById(postId).populate({
            path: "likes",
            model: "likeModel",
            match: { likeBy: req.userId }, // Only include likes by the current user
        });

        // Check if a like by this user exists
        if (!postWithLikes || postWithLikes.likes.length === 0) {
            return res.status(401).json({ message: "You cannot dislike" });
        }

        // Get the specific `likeModel` ID to remove
        const likeToRemoveId = postWithLikes.likes[0]._id;

        // Remove the like document from the `likeModel` collection
        await likeModel.deleteOne({ _id: likeToRemoveId });

        // Pull the like ID from the `likes` array in `postModel`
        await postModel.findByIdAndUpdate(
            postId,
            { $pull: { likes: likeToRemoveId } },
            { new: true } // Return the updated document after pulling
        );

        return res.status(200).json({ message: "Unliked the post" });
    } catch (err) {
        console.error("Error in doUnLike controller", err);
        return res.status(500).json({ error: "Error in doUnLike controller" });
    }
};

interface IGetPostLikesRequest extends Request {
    params: {
        id: string;
    }
}
export const getPostLikes = async (req: IGetPostLikesRequest, res: Response): Promise<any> => {
    try {
        const { id: postId } = req.params;
        // Find the all likes of current Post
        const likesOfPost = await postModel.findById(postId).select('-_id likes').populate("likes");
        return res.status(200).json({
            message: "All the likes of this Post",
            likesOfPost,
        })
    }
    catch (err) {
        console.error("Error in GetPostLIke controller", err);
        return res.status(500).json({ error: "Error in GetPostLIke controller" });

    }
}
interface ILike extends Document {
    likeStatus: boolean;
    likeBy: Schema.Types.ObjectId;  // or use `string` if `likeBy` is stored as a string ID
}

interface ILikeStatusRequest extends Request {
    userId?: string;
    params: {
        id: string;
    }

}
export const likeStatus = async (req: ILikeStatusRequest, res: Response): Promise<any> => {
    try {

        const { id: postId } = req.params;
        // Find the post and populate only likes by the current user
        const postLikeStatus = await postModel.findById(postId)
            .select("likes")
            .populate<{ likes: ILike[] }>({  // Specify type of populated `likes`
                path: "likes",
                model: "likeModel",
                match: { likeBy: req.userId },
            });

        // Cast `likes` to ILike[] to access `likeBy`
        const userLike = postLikeStatus?.likes[0];

        if (userLike) {
            return res.status(200).json({
                message: "Like status is true",
                likeStatus: true,
                likeBy: userLike.likeBy
            });
        } else {
            return res.status(200).json({ message: "Like status is false", likeStatus: false });
        }
    } catch (err) {
        console.error("Error in likeStatus controller", err);
        return res.status(500).json({ error: "Error in likeStatus controller" });
    }
};
