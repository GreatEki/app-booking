import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
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

    // Check if roomNumber has been created before to avoid duplication
    const dupliRoom = await Room.findOne({ roomNumber });

    if (dupliRoom) {
      throw new BadRequestError("Room with number already created");
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
      { _id: roomCategoryId },
      {
        $addToSet: {
          roomNumbers: [{ roomId: result._id, roomNo: result.roomNumber }],
        },
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

export const getAllRoomsByCategoryId = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    // does category exist
    const existingCat = await RoomCategory.findById(categoryId);

    if (!existingCat) {
      throw new NotFoundError("Room category not found");
    }

    const allRooms = await Room.find({ roomCategoryId: categoryId });

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "All room retrieved",
      count: allRooms.length,
      data: allRooms,
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

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    // find room
    const theRoom = await Room.findById(roomId);

    if (!theRoom) {
      throw new NotFoundError("Room not found");
    }

    // remove roomNumber from RoomCategory roomNumbers
    await RoomCategory.findOneAndUpdate(
      { _id: theRoom.roomCategoryId },
      {
        $pullAll: {
          roomNumbers: [{ roomId: theRoom._id, roomNo: theRoom.roomNumber }],
        },
      }
    );

    const delRoom = await Room.findByIdAndDelete(roomId);

    return res.json({
      success: true,
      staus: "OK",
      stausCode: 200,
      message: "Room deleted",
      data: delRoom,
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
