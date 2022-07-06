import mongoose from "mongoose";

const connectDB = () => {
  try {
    const conn = mongoose.connect(`${process.env.MONGO_URI}`, {
      retryWrites: true,
      w: "majority",
    });

    console.log("Mongo Database connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default connectDB;
