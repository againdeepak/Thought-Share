import { Request, Response } from "express"
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import { generateJWTtoken } from "../config/createJWT";
interface userSignInRequest extends Request {
    body: {
        userName: string;
        email: string;
        age: number;
        password: string;
    }
}
export const userSignUp = async (req: userSignInRequest, res: Response): Promise<any> => {
    try {
        const { userName, email, age, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!email || !password || !age || !password) {
            return res.status(401).json({ message: "Fill requirements fields" });
        }
        if (foundUser) {
            return res.status(401).json({ message: "User already exists" });
        } else {
            // Hash the password before storing it...
            const saltRound = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, saltRound);

            // const hashedPassword = 
            const newUser = User.build({
                userName,
                email,
                age,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            // Create JWT Token for storing informations
            const payload = {
                userId: savedUser._id
            }
            const token = generateJWTtoken(payload);
            res.cookie("usertoken", token, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true });
            const result = req.cookies.usertoken;
            return res.status(200).json({ newUser: savedUser, message: "SignUp Successfully" });
        }
    } catch (err) {
        return res.status(500).send(err as string);
    }
}

interface userLoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}
export const userLogin = async (req: userLoginRequest, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({email});

        if (!email || !password) {
            return res.status(401).json({ message: "Fill requirements fields" });
        }
        if (!foundUser) {
            return res.status(401).json({ message: "You don't have account" });
        } else {
            const matchedPass = await bcrypt.compare(password, foundUser.password);
            if (!matchedPass) {
                return res.status(401).json({ message: "Password is not correct" });
            }
            const payload = {
                userId: foundUser._id
            }
            const token = generateJWTtoken(payload);
            res.cookie("usertoken", token, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).json({ message: "Login successfully"});
        }
    } catch (err) {
        console.log("error in UserLoginController",err);
        return res.status(500).json({error:"Internal server error in UserLOginController"});
    }
}

export const userLogout = async (req: Request, res: Response)=>{
    try {
        res.clearCookie('usertoken', { path: '/' }); // Clears the cookie named 'usertoken'
        res.status(200).json({ message: "Logout successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}