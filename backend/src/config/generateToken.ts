import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET as string;
export const generateToken = (payload: object): string => {
    try{
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
        return token;
    }catch(err){
        console.log("Error while generating token");
        throw err;
    }
}

