import React, { useContext, useEffect, useState } from 'react';
import { FcLikePlaceholder, FcShare, FcComments, FcLike } from "react-icons/fc";
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../lib/axiosInstance';
import { commentsOfPostHook } from '../../hooks/commentHooks';
import toast from 'react-hot-toast';
import { postLikeHook, postUnLikeHook, likesOfPostHook, likeStatusHook } from '../../hooks/likeHook';
import { CreateComment } from '../comment/CreateComment';

interface PostType {
  _id: string;
  photo: string;
  location: string;
  postBy: string;
  currUserPic:string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PostProps {
  item: PostType;
  userPost: PostType[];
}
interface commentByTypes{
  _id:string;
  userName:string;
  userPic:string;
  password:string;
}
interface CommentTypes {
  _id: string;
  comment: string;
  commentBy: commentByTypes;
  createdAt: string;
  updatedAt: string;
}
// Helper function to convert date to IST format
const convertToIST = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-IN", options);
};

export const Post: React.FC<PostProps> = ({ item, userPost }) => {
  const navigate = useNavigate()
  const checkPost = userPost.some(post => post._id === item._id);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [commentStatus, setCommentStatus] = useState<boolean>(false);
  const checkEdit = (item.createdAt === item.updatedAt) ? false : true;
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Error in AppContext");
  }
  const { authUser } = context;
  const editPost = (postId: string) => {
    navigate(`/post/edit/${postId}`);
  }
  const deletePost = async (postId: string) => {
    try {

      await axiosInstance.delete(`/user/post/${postId}/delete`, { withCredentials: true })
      navigate('/delete-status');


    } catch (err) {
      if (err) {
        console.log(err);
        toast.error(err as string);
      }
    }
  }

  const likePost = async (postId: string) => {
    try {
      if (!authUser) {
        toast.error("Login, first for like post");
        navigate('/login')
      }
      else {
        await postLikeHook(postId);
        likeStatusHandler();
        likesOfPost();
      }
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }

  }
  const unLikePost = async (postId: string) => {
    try {
      if (!authUser) {
        toast.error("Login, first for dislike post");
        navigate('/login')
      } else {
        await postUnLikeHook(postId);
        likeStatusHandler();
        likesOfPost()
      }
    } catch (err) {
      toast.error(err as string);
    }
  }

  const likesOfPost = async () => {
    try {
      const postLikesCount = await likesOfPostHook(item._id);
      setLikeCount(postLikesCount);
    } catch (err) {
      toast.error("Internal server error");
    }

  }
  useEffect(() => {
    likesOfPost();
    // eslint-disable-next-line 
  }, [])

  const likeStatusHandler = async () => {
    const response = await likeStatusHook(item._id);
    setLikeStatus(response);
  }

  if (authUser) { // This status only showed liked as red... when user is loggedin...
    likeStatusHandler();
  }

  const commentHandler = () => {
    setCommentStatus(!commentStatus);
  }

  const [comments, setComments] = useState<CommentTypes[]>([]);
  const commentsOfPostFun = async () => {
    const allComments = await commentsOfPostHook(item._id)
    setComments(allComments);
  }
  useEffect(() => {
    commentsOfPostFun();
    // eslint-disable-next-line
  }, [])
  return (
    <div className='post-container'>

      <div className='user-pic-information'>

        <div className='leftSideUserProfile'>
          <div className='userImage'>
            <img src={item.currUserPic} alt='user_Profile' />
          </div>

          <div className='userInformation'>
            <span><strong>{item.postBy} </strong></span>
            <span>{item.location}</span>
          </div>
        </div>

        {(authUser && checkPost) ? (
          <div className='rightSideUserProfile'>
            <button className='btn btn-primary' onClick={() => editPost(item._id)}>Edit</button>
            <button className='btn btn-danger' onClick={() => deletePost(item._id)}>Delete</button>
          </div>
        ) : (
          <button className='btn btn-primary'>Follow</button>
        )

        }
      </div>

      <div className='postImage'>
        <img src={item.photo} alt='post_Picture' />
      </div>

      <div className='description'>
        <p><strong>Desc</strong>: {item.description}</p>
      </div>

      <div className='createAndUpdate description'>
        {
          checkEdit ? (
            <p><strong>Edited on</strong>: {convertToIST(item.updatedAt)}</p>
          ) : (
            <p><strong>Posted on</strong>: {convertToIST(item.createdAt)}</p>
          )
        }
      </div>

      <div className='like-comment-share'>
        {
          likeStatus ? (
            <span onClick={() => unLikePost(item._id)}>Liked<FcLike />{likeCount === 0 ? ("") : (likeCount)}</span>
          ) :
            (
              <span onClick={() => likePost(item._id)}>Like<FcLikePlaceholder />{likeCount === 0 ? ("") : (likeCount)}</span>
            )
        }
        <span onClick={commentHandler}>Comment <FcComments />{comments.length?(comments.length):("")}</span>
        <span>Share <FcShare /></span>
      </div>
      {/* Comment Section for commenting... */}
      {commentStatus &&
        <div>
          <hr />
          <CreateComment
           postId={item._id}
           postBy={item.postBy}
           commentsOfPostFun={commentsOfPostFun}
          
            comments={comments} />
        </div>
      }
    </div>
  );
};
