import { Request, Response } from "express";
import postModel from "../models/postModel";
import userModel from "../models/userModel";
import commentModel from "../models/commentModel";

interface createCommentRequest extends Request {
    userId?: string;
    params: {
        id: string
    }
    body: {
        comment: string;
        commentBy: string;
    }
}
export const createComment = async (req: createCommentRequest, res: Response): Promise<any> => {
    try {

        // Find the current User...
        const currUser = await userModel.findOne({ _id: req.userId });
        const { comment } = req.body;
        const { id: postId } = req.params;

        const newMessage = new commentModel({
            comment, commentBy: currUser,
        })
        const newComment = await newMessage.save();
        // Push inside the current User's posts array...
        await postModel.findByIdAndUpdate(
            { _id: postId },
            { $push: { comments: newComment._id } }
        )
        return res.status(200).json({ message: "Post created successfully", newComment });

    } catch (err) {
        console.error("Error in createComment controller", err);
        return res.status(500).json({ error: "Error in createComment controller" })
    }
}


export const editComment = async (req: createCommentRequest, res: Response): Promise<any> => {
    try {
        const { id: commentId } = req.params;
        const currCommentId = await commentModel.findById(commentId).select('commentBy');

        // Check if the comment is done by the currUser or not...
        const commentByUserId = currCommentId?.commentBy?._id.toString();

        if (req.userId !== commentByUserId) {
            return res.status(401).json({ message: "You don't have access to edit" });
        }
        const { comment } = req.body;
        const updatedComment = await commentModel.findByIdAndUpdate(commentId, {
            comment: comment
        })

        return res.status(200).json({ message: "Comment has been updated", updatedComment });
    } catch (err) {
        console.error("Error in editComment controller", err);
        return res.status(500).json({ error: "Error in editComment controller" })
    }
}


/* Delete me kya karna hai. guys...  
comment to delete karna hi hai... Baki postModel se bhi remove karna hai...*/

export const deleteComment = async (req: createCommentRequest, res: Response): Promise<any> => {
    try {
        const { id: commentId } = req.params;
        const currCommentId = await commentModel.findById(commentId).select('commentBy');

        // Check if the comment is done by the currUser or not...
        const commentByUserId = currCommentId?.commentBy?._id.toString();

        if (req.userId !== commentByUserId) {
            return res.status(401).json({ message: "You don't have access to delete it" });
        }

        const updatedComment = await commentModel.findByIdAndDelete(commentId);

        // Find the Post where this comment belonging, For remove the comment from the Post's comments'...
        const commentBelongToPost = await postModel.findOne({ comments: commentId });
        await postModel.findByIdAndUpdate(
            { _id: commentBelongToPost?._id },
            { $pull: { comments: commentId } }
        )
        return res.status(200).json({ message: "Comment has been updated", updatedComment, deleteComment });
    } catch (err) {
        console.error("Error in deleteComment controller", err);
        return res.status(500).json({ error: "Error in deleteComment controller" })
    }
}


interface commentsOfPostRequest extends Request{
    params:{
        id:string;
    }
}

export const commentsOfPost =async (req:commentsOfPostRequest, res:Response): Promise<any> =>{
    try{
        const {id: postId} = req.params;
        const comments = await postModel.findById(postId).select("comments -_id")
        .populate({
            path: "comments",
            options: { sort: { updatedAt: -1 } },// Sort by updatedAt in descending order
            populate: {
                path: "commentBy", // Populate the commentBy field within each comment
                select: "userName userPic"  // Only select the userName field from the user model
            }
        });
        return res.status(200).json({comments});
    }catch(err){
        console.error("Error in commentsOfPost controller", err);
        return res.status(500).json({ error: "Error in commentsOfPost controller" })
    }
}

