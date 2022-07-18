import { GridFsStorage } from "multer-gridfs-storage";
import * as crypto from "crypto";
import path from "path";
import multer from "multer";
import Grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs;

const promise = mongoose.connect(`${process.env.MONGO_URI}`, {
  retryWrites: true,
  w: "majority",
});

const conn = mongoose.connection;

conn.once("open", () => {
  gfs = Grid(conn, mongoose.mongo);
  gfs.collection(`${process.env.FILE_UPLOAD_COL}`);
});

const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err: any, buf: any) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: `${process.env.FILE_UPLOAD_COL}`,
        };

        resolve(fileInfo);
      });
    });
  },
});

export const upload = multer({ storage });
