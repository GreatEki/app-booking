import mongoose from "mongoose";

// let gfs;

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      retryWrites: true,
      w: "majority",
    });

    console.log(`MongoDB connected`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default connectDB;
