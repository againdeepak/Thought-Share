
import { Comment } from "./Comment";

interface CommentByTypes{
    _id:string;
    userName:string;
    userPic:string;
    password:string;
}
interface CommentTypes{
 _id: string;
  comment: string;
  commentBy: CommentByTypes;
  createdAt: string;
  updatedAt: string;

}
interface CommentProps {
    postId: string;
    comments: CommentTypes[];
    commentsOfPostFun: () => Promise<void>;   


}

export const CommentOfPost: React.FC<CommentProps> = ({comments, commentsOfPostFun }) => {
   
    return (
        <>{
            (comments.length) ? (
                <div className="container comments-container">
                    {
                        comments.map((item) => (
                            <Comment key={item._id} 
                            item={item}
                            commentsOfPostFun={commentsOfPostFun}
                            />
                        ))
                    }
                </div>
            ) : (
                <p className="text-sm-center mt-2">Yet no comments, <strong>start conversations</strong></p>
            )
        }
        </>
    )
}