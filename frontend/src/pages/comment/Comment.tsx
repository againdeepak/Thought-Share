import { formatDistanceToNow } from 'date-fns';
import { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { editCommentHook } from '../../hooks/commentHooks';
import axiosInstance from '../../lib/axiosInstance';


interface CommentByTypes {
    _id: string;
    userName: string;
    password:string;
    userPic?:string;
}
interface CommentTypes {
    _id: string;
    comment: string;
    commentBy: CommentByTypes;
    createdAt: string;
    updatedAt: string;
}
interface CommentProps {
    item: CommentTypes;
    commentsOfPostFun: () => Promise<void>;   

}
export const Comment: React.FC<CommentProps> = ({ item, commentsOfPostFun }) => {
    const [editStatus, setEditStatus] = useState<boolean>(false); // Keep tracking the Edit Form
    const [comment, setComment] = useState<string>(item.comment);

    const checkEditComment = item.createdAt === item.updatedAt ? false : true;
    const getRelativeTime = (timestamp: string): string => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };
    const timeString = getRelativeTime(item.updatedAt);
    // Outputs "2 seconds ago", "1 month ago", etc.
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Error in AppContext");
    }
    const { authUser, currUserId } = context;
    const commentEditHandler = (commentId: string) => {
        setEditStatus(!editStatus);
    }
    const commentDeleteHandler = async (commentId: string) => {
        await axiosInstance.delete(`/user/post/comment/${commentId}/delete`,{withCredentials:true})
        commentsOfPostFun();
    }
    const editCommentHandler = async (e?: React.FormEvent<HTMLFormElement>) =>{
        e?.preventDefault();
        try{
            await editCommentHook(item._id, {comment})
            // Run the Comments of commentsOfPostFun for re-directing changes on UI
            commentsOfPostFun()
            setEditStatus(false);
        }catch(err){
            console.log(err);
        }
    }
    const commentUpdateHandler = () => {
        editCommentHandler();
    }
    return (
        <div className="comment-information m-3 p-2">
            <div className='commentOwnerInfo'>
                <img src={item.commentBy.userPic} alt="deepak_jalwa" />
                <p><strong>{item.commentBy.userName} </strong><small>{checkEditComment ? <i>Edited</i>:""} {timeString}</small></p>
            </div>

            {
                editStatus ? (
                    // Edit Comment Form
                    <form onSubmit={editCommentHandler} className="editComment-container">
                        <div className="editComment">
                            <input type="text" id="comment" name="comment" value={comment} placeholder={`Post your comment...`}
                                onChange={(e) => setComment(e.target.value)} />
                        </div>
                    </form>
                ) : (
                    <>
                        <div className='commentContent'>
                            {item.comment}
                        </div>
                    </>
                )
            }

            {
                (authUser && currUserId === item.commentBy._id) &&
                <div className='commentEditDelete'>
                    {
                        editStatus ? (
                            <span className='commentEdit' onClick={commentUpdateHandler}>Update</span>
                        ) : (
                            <span className='commentEdit' onClick={() => commentEditHandler(item._id)}>Edit</span>
                        )
                    }
                    <span className='commentDelete' onClick={() => commentDeleteHandler(item._id)}>Delete</span>
                </div>
            }
        </div>
    )
}