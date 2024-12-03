import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

export async function dbConn() {
    await mongoose.connect(
        MONGO_URL as string,{dbName: "fithive"}
    )
    .then((res) => { console.log("Connected to mongodb") })
    .catch((err) => { console.log(err) })
}
