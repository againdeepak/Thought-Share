import React, { useEffect, useState } from 'react'
import { userPostHook } from '../../hooks/postHook'
import { Post } from './Post';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

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

export const UserPosts: React.FC = () => {
    const [post, setPost] = useState<PostType[]>([]);
    const [userPost, setUserPost] = useState<PostType[]>([]);
    const userPosts = async () => {
        try {
            const result = await userPostHook();
            setPost(result);
            setUserPost(result);
        } catch (err) {
            toast.error(err as string);
        }
    }
    useEffect(() => {
        userPosts();
    }, [])

    return (
        <div className='text-white scrollable-container'>
            {
                (post.length === 0) ?
                    (<div className='noPosts'>
                        <div className='createPostPage'>
                            <Link to='/create-post' className='text-decoration-none text-white'>Oops...There is no posts, <br /><span className='text-decoration-underline clickHere'>Click here to create post </span></Link>
                        </div>
                        <div>
                            <img src='lookingforpost.png' alt='looking-post'></img>
                        </div>
                    </div>
                    ) : (<div className="container">
                        {post.map((item) => (
                            <Post key={item._id} item={item} userPost={userPost} />
                        ))}
                    </div>)
            }
        </div>
    )
}




