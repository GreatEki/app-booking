import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

const createRegisterUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const valReqisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createRegisterUserSchema.validateAsync(req.body);
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  next();
};
