import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import NotFoundError from "./errors/NotFoundError";
import mongoose from "mongoose";
import path from "path";
import router from "./routes";
import cors from "./middleware/cors";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
import fileUpload from "express-fileupload";
import busboy from "connect-busboy";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy());
app.use(fileUpload());

app.use(cors);
app.use(cookieParser());
app.use(verifyToken);

dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

connectDB();
mongoose.connection.on("disconnected", () => {
  console.log("Mongo database has disconnected");
});

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError("Resource not found");
  next(error);
});

const PORT = process.env.PORT || 9500;

app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
