import express  from "express";
import { Request, Response } from "express";
import { dbConn } from "./config/dbConn";
import UserRoute from './routes/userRoute';
import NoteRoute from './routes/noteRoute';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/user',UserRoute);
app.use('/user/',NoteRoute)

app.listen(PORT,()=>{
    console.log("Listening to port number");
    dbConn();
})
app.post('/send-cookie',(req:Request, res:Response)=>{
    res.cookie("Name","Deepak Kumar");
    res.send("Cookie has been set")
})
app.get('/get-cookie',(req:Request, res:Response)=>{
    const result = req.cookies.Name;
    res.send(result);
})
app.get('/',(req:Request, res:Response)=>{
    res.send("Working and this is home page");
})