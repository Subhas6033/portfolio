import mongoose from "mongoose";
import { DB_NAME } from "../Constants/constant.js";

const connectDB = async () => {
  try {
    const connectDbInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster`
    );
    console.log(`DB connected Successfully!!`);
  } catch (error) {
    console.log("Connecting to : " + process.env.MONGODB_URL)
    console.log(`Data Base connection failed ${error}`);
  }
};

export { connectDB };
