import { Request, Response } from "express";
import path from "path";
import BadRequestError from "../../errors/BadRequestError";
import util from "util";

interface FileUpload extends Request {
  files: any;
}

export const uploadHandler = async (req: FileUpload, res: Response) => {
  try {
    const file = req.files.file;

    if (file) {
      const fileName = file.name;
      const extension = path.extname(fileName);

      const fileSize = file.size / (1024 * 1024);

      const allowedExtensions = /png|jpeg|jpg|gif|jfif|mp4|webm/;

      if (!allowedExtensions.test(extension)) {
        throw new BadRequestError("Unsupported document format" + extension);
      }

      if (fileSize > 10) {
        throw new BadRequestError("File should not be greater than 10MB");
      }

      const md5 = file.md5;
      const URL = "/uploads/" + md5 + extension;

      const result = await util.promisify(file.mv)("./public" + URL);

      res.json({
        success: true,
        status: "OK",
        statusCode: 201,
        message: "File uploaded successfully",
        result,
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      status: err.status,
      statusCode: err.stausCode,
      message: err.message,
    });
  }
};
