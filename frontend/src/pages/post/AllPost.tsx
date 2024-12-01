import React, { useEffect, useState } from 'react';
import { getAllPostHook, userPostHook } from '../../hooks/postHook';
import { Post } from './Post';
import { PostNavbar } from './PostNavbar';
import { Link } from 'react-router-dom';
// Define a type for a post item
interface postByUser {
  userName: string;
  userPic: string;
}
interface PostType {
  _id: string;
  photo: string;
  location: string;
  postBy: postByUser;
  description: string;
  createdAt: string;
  updatedAt: string;
}


export const AllPost: React.FC = () => {
  const [post, setPost] = useState<PostType[]>([]);
  const [userPost, setUserPost] = useState<PostType[]>([]);

  const getAllPost = async () => {
    try {
      const response = await getAllPostHook();
      setPost(response);
      const result = await userPostHook();
      setUserPost(result);
    } catch (err) {
      if (err === "Token not provided")
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="all-posts scrollable-container">
      <PostNavbar />
      {
        post.length === 0 ? (<div className='noPosts'>
          <div className='createPostPage'>
            <Link to='/create-post' className='text-decoration-none text-white'>Oops...There is no posts, <br /><span className='text-decoration-underline clickHere'>Click here to create post </span></Link>
          </div>
          <div>
            <img src='lookingforpost.png' alt='looking-post'></img>
          </div>
        </div>) : (<>
          {post.map((item) => (
            <Post key={item._id} item={item} userPost={userPost} />
          ))}
        </>)
      }


    </div>
  );
};
