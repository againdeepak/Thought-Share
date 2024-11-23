import React, { useContext, useState } from "react";
import { postCommentHook } from "../../hooks/commentHooks";
import { CommentOfPost } from "./CommentOfPost";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface commentByTypes{
    _id:string;
    userName:string;
    password:string;
    userPic:string;
}
interface CommentTypes {
    _id: string;
    comment: string;
    commentBy: commentByTypes;
    createdAt: string;
    updatedAt: string;
}

interface PostProps {
    postId: string;
    postBy: string;
    commentsOfPostFun: () => Promise<void>;   
    comments: CommentTypes[];
}

export const CreateComment: React.FC<PostProps> = ({postId, postBy, commentsOfPostFun, comments}) => {
    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const context = useContext(AppContext);
    if(!context){
        throw new Error("Error in AppContext");
    }
    const {authUser} = context;
    const createCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(!authUser){
                toast.error("Login, first for comment");
                navigate('/login');
            }else{
                setLoading(true);
                const response = await postCommentHook(postId, { comment });
                console.log(response);
                setComment("");
                commentsOfPostFun(); // Run this function for fetching data... to show on UI
                setLoading(false);
            }
        }catch(err){
            console.log(err);
        }
        
    }
    return (
        <><form onSubmit={createCommentHandler} className="comment-container">
            <div className="comment-input-box">
                <label htmlFor="comment"></label><br />
                <input type="text" id="comment" name="comment" value={comment} placeholder={`Post your comment...`}
                    onChange={(e) => setComment(e.target.value)} />
            </div>
            <div className="comment-input-btn">
                {
                    loading ? (<i>Loading...</i>) : (<button type="submit">Post </button>)
                }
            </div>
        </form>
        <CommentOfPost 
        postId = {postId}
         comments={comments}
         commentsOfPostFun={commentsOfPostFun} 
         />
        </>

    )
}