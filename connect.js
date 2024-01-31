import mongoose from "mongoose";

export const connectToMongoDB = () => {
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener-db";
  return mongoose.connect(mongoUri);
};
