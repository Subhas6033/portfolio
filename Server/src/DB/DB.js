import mongoose from "mongoose";
import { DB_NAME } from "../Constants/constant.js";

const connectDB = async () => {
  try {
    const connectDbInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`MongoDB connected: ${connectDbInstance.connection.host}`);
  } catch (error) {
    console.log("Connecting to : " + process.env.MONGODB_URL)
  }
};

export { connectDB };
