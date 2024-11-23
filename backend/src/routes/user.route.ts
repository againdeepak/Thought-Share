import express, { Router } from 'express';
import { userLogin, userSignUp, userLogout, userInformation, updateUserProfilePic} from '../controller/user.controller';
import { createPost, getAllPosts,userPosts, editPost, getPost, deletePost} from '../controller/post.controller';
import { protectedUser } from '../middleware/protectedUser';
import { commentsOfPost, createComment, deleteComment, editComment } from '../controller/comment.controller';
import { doLike, doUnLike, getPostLikes, likeStatus} from '../controller/like.controller';
const router: Router = express.Router();

router.post('/signup', userSignUp);
router.post('/login',userLogin);
router.post('/logout',userLogout);
router.put('/profile/:id/update',protectedUser,updateUserProfilePic);
router.get('/info',protectedUser,userInformation);
router.post('/create/post',protectedUser,createPost);
router.get('/post/:id',protectedUser,getPost);
router.put('/post/:id/edit',protectedUser,editPost);
router.delete('/post/:id/delete',protectedUser,deletePost);
router.get('/all-posts',getAllPosts);
router.get('/posts',protectedUser,userPosts);
router.post('/post/:id/like',protectedUser,doLike);
router.delete('/post/:id/unlike',protectedUser,doUnLike);
router.get('/post/:id/likes',getPostLikes);
router.get('/post/:id/like/status',protectedUser, likeStatus);
router.post('/post/:id/comment',protectedUser,createComment);
router.get('/post/:id/comments',commentsOfPost)
router.put('/post/comment/:id/edit',protectedUser,editComment);
router.delete('/post/comment/:id/delete',protectedUser,deleteComment);

export default router;