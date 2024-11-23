import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.SECRET as string;

interface CustomRequest extends Request {
    userId?: string;
}

export const protectedUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
        // Get the token from cookies
        const token = req.cookies.usertoken;
        if (!token) {
            res.status(401).json({ error: "Token not provided" });
            return;
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        if(!decoded){
            res.status(401).json({ error: "Not a valid token provided" });
            return;
        }
        const {userId} = decoded;
        // Attach userId to request
        req.userId = userId;
        next();
    } catch (err) {
        console.error("Error in verifyTokenFromCookie middleware:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
