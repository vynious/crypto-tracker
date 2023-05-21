import mongoose from "mongoose";  
import dotenv from "dotenv";
// import mysql from "mysql";

dotenv.config();

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database CONNECTED: ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    };
}



export default connectDb;