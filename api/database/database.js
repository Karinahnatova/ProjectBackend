import mongoose from "mongoose";

const connectDB = async () => {
  const url = `mongodb+srv://karinahnatova:Greo6789@cei-valencia.sl8cxae.mongodb.net/`;
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
