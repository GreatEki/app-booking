import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  res.json({
    success: true,
    status: "Success",
    statusCode: 200,
    message: "You have reached the users routes",
  });
};
