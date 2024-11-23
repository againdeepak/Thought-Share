import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL as string;

async function dbConn (){
    await mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log("Success connected");
    })
    .catch(()=>{
        console.log("Not connected");
    })
}
export default dbConn;