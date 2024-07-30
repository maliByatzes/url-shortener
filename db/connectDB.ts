import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected.');
  } catch (err: any) {
    console.error(`Error connecting to mongoDB: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
