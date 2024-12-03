import express from 'express';
const router = express.Router();
import { userLogin, userLogout, userSignUp } from '../controllers/userController';
import { userValidation } from '../validation/userValidation';
router.post('/signup', userValidation, userSignUp)
    .post('/login', userLogin)
    .post('/logout', userLogout);


export default router;