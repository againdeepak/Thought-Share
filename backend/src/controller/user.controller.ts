import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from 'bcryptjs';
import { generateToken } from "../config/generateToken";

// Define the expected structure of the request body
interface UserSignUpRequest extends Request {
    body: {
        userName: string;
        email: string;
        password: string;
    };
}

export const userSignUp = async (req: UserSignUpRequest, res: Response): Promise<any> => {
    try {
        const { userName, email, password } = req.body;
        // check for empty field
        if (!userName || !email || !password) {
            return res.status(401).json({ error: "Please, fill the required field" });
        }
        // check for password must be >= 6 chars
        if (password.length < 6) {
            return res.status(401).json({
                error: "Password must be at least 6 characters"
            })
        }
        // check for the Email (USER), Already exists...
        const existsUser = await userModel.findOne({ email });
        if (existsUser) {
            return res.status(401).json({
                error: "User already exists"
            })
        } else {
            // hash the password before storing it...
            const saltRound = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, saltRound);
            const newUser = new userModel({
                userName, email, password: hashedPassword
            })

            const response = await newUser.save();
            const payload = {
                userId: response._id
            }
            // Generate Token
            const token = generateToken(payload)
            // Set inside the cookie
            res.cookie('usertoken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            })
            return res.status(200).json({ message: "User signup successfully!", response, token });
        }
    } catch (err) {
        console.error("Error in userSignUp controller", err);
        return res.status(500).json({ error: "Error in userSignUp controller", err });
    }
}

interface UserLoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}
export const userLogin = async (req: UserLoginRequest, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ error: "Please, fill all the required field" });
        }
        // Check if User is register or not...
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            return res.status(401).json({ error: "No user found" });
        } else {
            // Check for the password
            const matchPassword = await bcrypt.compare(password, userExists.password);
            if (!matchPassword) {
                return res.status(401).json({ error: "Password incorrect" });
            }
        }

        const payload = {
            userId: userExists._id
        }
        // Generate Token
        const token = generateToken(payload);
        // Set inside the cookie
        res.cookie('usertoken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        })
        return res.status(200).json({ message: "User login successfully!", userExists, token });
    } catch (err) {
        console.error("Error in userLogin controller", err);
        return res.status(500).json({ error: "Error in userLogin controller", err });
    }
}

export const userLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('usertoken', { path: '/' }); // Clears the cookie named 'usertoken'
        res.status(200).json({ message: "Logout successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}
interface UserInfoRequest extends Request {
    userId?: string;
}
export const userInformation = async (req: UserInfoRequest, res: Response): Promise<any> => {
    try {
        const userInfo = await userModel.findById(req.userId);
        return res.status(200).json({ userInfo });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

interface UserProfilePicRequest extends Request {
    params: {
        id: string;
    }
    body: {
        photo: string;
    }
}
export const updateUserProfilePic = async (req: UserProfilePicRequest, res: Response): Promise<any> => {

    try {
        const { id: userId } = req.params;
        const { photo } = req.body;
        const response = await userModel.findByIdAndUpdate(userId, {userPic:photo},{new:true});
        return res.status(200).json({message:"Updated profile picture",response});
    } catch (err) {
        console.log("error in updateUserProfilePic controller")
        res.status(500).json({ error: "Internal server error" });

    }
}