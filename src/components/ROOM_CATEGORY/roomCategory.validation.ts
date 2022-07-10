import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

const valCreateRoomCatBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  hotelId: Joi.string().required(),
});

export const valCreateRoomCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await valCreateRoomCatBodySchema.validateAsync(req.body);
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  next();
};
