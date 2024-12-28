import express,{Request,Response} from 'express';
import dbConn from './config/dbConn'; 
import userRoute from './routes/user.route';
import cloudinaryRoute from './routes/cloudinary.route';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const ___dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000', // replace with your client URL
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/user',userRoute);
app.use('/cloud',cloudinaryRoute);
app.use(express.static(path.join(___dirname,'../frontend/build')));

app.get("*",(req:Request,res:Response)=>{
    res.sendFile(path.join(___dirname,"frontend","build","index.html"));
})

app.listen(PORT,()=>{
    console.log("Listening to poort no",PORT);
    dbConn();
})

export default app;
