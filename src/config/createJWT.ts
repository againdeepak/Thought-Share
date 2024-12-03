import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET  = process.env.SECRET as string;

export const generateJWTtoken = (payload: object): string => {
    try {
        const token = jwt.sign(payload, SECRET , {
            expiresIn: "2h"
        });
        
        return token;
    } catch (err) {
        console.log("Error while generating jwt token ", err);
        throw err;
    }
}