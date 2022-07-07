import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

const valRegisterUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const valLoginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const valReqisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await valRegisterUserSchema.validateAsync(req.body);
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  next();
};

export const valLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await valLoginUserSchema.validateAsync(req.body);
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  next();
};
