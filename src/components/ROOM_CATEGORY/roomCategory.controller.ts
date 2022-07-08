import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import NotFoundError from "../../errors/NotFoundError";
import { Hotels, RoomCategory } from "../../models";

export const createRoomCategory = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    // Check if hotel exists
    const theHotel = await Hotels.findById(hotelId);

    if (!theHotel) {
      throw new NotFoundError("Hotel not found");
    }

    const { name, description, roomNumbers } = req.body;

    const newCategory = new RoomCategory({
      name,
      description,
      roomNumbers,
      hotelId,
    });

    const result = await newCategory.save();

    return res.json({
      success: true,
      status: "Created",
      statusCode: 201,
      message: `New room category created for ${theHotel.name}`,
      data: result,
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
