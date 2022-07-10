import { Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { Room, RoomCategory } from "../../models";

export const addRoom = async (req: Request, res: Response) => {
  try {
    const { roomNumber, roomCategoryId, price, hotelId, maxPeopleAllowed } =
      req.body;

    const theCat = await RoomCategory.findOne({ _id: roomCategoryId, hotelId });

    if (!theCat) {
      throw new NotFoundError("No category found for this hotel");
    }

    const newRoom = new Room({
      roomNumber,
      roomCategoryId,
      price,
      hotelId,
      maxPeopleAllowed,
    });

    const result = await newRoom.save();

    // Push Room ID to Room Category
    await RoomCategory.findOneAndUpdate(
      { _id: result._id },
      {
        $push: { roomNumbers: roomNumber },
      }
    );

    return res.json({
      success: true,
      status: "Created",
      statusCode: 201,
      message: "Room added",
      data: result,
    });
  } catch (err) {
    return res.json({
      success: false,
      status: err.status,
      statusdCode: err.statusCode,
      message: err.message,
    });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
      $set: req.body,
    });

    if (!updatedRoom) {
      throw new NotFoundError("Room not found");
    }

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "Room updated",
      data: updatedRoom,
    });
  } catch (err) {
    return res.json({
      success: false,
      status: err.status,
      statusdCode: err.statusCode,
      message: err.message,
    });
  }
};
