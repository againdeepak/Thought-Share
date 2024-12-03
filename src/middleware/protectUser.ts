import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET as string;
interface protectedRequest extends Request {
    userId?: string;
}
export const protectedUser = (req: protectedRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.usertoken;
    try {
        if (!token) {
            console.log("Token not provided");
            res.status(400).json({ message: "Token not provided" });
            return;
        }
        const decode = jwt.verify(token, SECRET) as JwtPayload;
        if (!decode) {
            console.log("Token is not valid");
            res.status(400).json({ message: "Token is not valid" });
            return;
        }
        const { userId } = decode;
        req.userId = userId;
        next();
    } catch (err) {
        res.status(400).json({ message: "Internal server error" });
        return;
    }
}