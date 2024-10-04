import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`);
};

export default connectDB;
