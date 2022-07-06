import { Request, Response } from "express";
import { Hotels } from "../../models";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel = new Hotels(req.body);

    await newHotel.save();
    return res.json({
      success: true,
      status: "Created",
      statusCode: 201,
      message: "New Hotel Created",
      data: newHotel,
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
