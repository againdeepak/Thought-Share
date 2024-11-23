import express from 'express';
import dbConn from './config/dbConn'; 
import userRoute from './routes/user.route';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000', // replace with your client URL
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/user',userRoute);
app.listen(PORT,()=>{
    console.log("Listening to poort no",PORT);
    dbConn();
})

export default app;
