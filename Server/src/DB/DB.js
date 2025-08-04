import mongoose from "mongoose";
import { DB_NAME } from "../Constants/constant.js";


const connectDB = async () => {
    try {
        const connectDbInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`DB connected Successfully!!`)
    } catch (error) {
        console.log(`Data Base connection failed ${error}`)
    }
}

export {connectDB}