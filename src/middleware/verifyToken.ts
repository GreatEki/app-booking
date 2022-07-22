import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    files: any;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      throw new UnauthorizedError("Authorization Failed!");
    }

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
      if (err) {
        throw new UnauthorizedError("Invalid Token, Authorization Failed");
      }

      req.user = user;

      next();
    });
  } catch (err) {
    return res.json({
      success: false,
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  }
};

export default verifyToken;
