import React, { useEffect, useState } from 'react';
import { getAllPostHook, userPostHook } from '../../hooks/postHook';
import { Post } from './Post';
import { PostNavbar } from './PostNavbar';

// Define a type for a post item
interface PostType {
  _id: string;
  photo:string;
  location:string;
  postBy:string;
  currUserPic:string;
  description:string;
  createdAt:string;
  updatedAt:string;
}


export const AllPost: React.FC= () => {
  const [post, setPost] = useState<PostType[]>([]);
  const [userPost, setUserPost] = useState<PostType[]>([]);

  const getAllPost = async () => {
    try{
      const response = await getAllPostHook();
      console.log(response);
      setPost(response);
      const result = await userPostHook();
      setUserPost(result);
    }catch(err){
      if(err==="Token not provided")
        console.log(err);
    }

  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="all-posts scrollable-container">
      <PostNavbar/>
      {post.map((item) => (
        <Post key={item._id} item={item} userPost={userPost}/>
      ))}
    </div>
  );
};
