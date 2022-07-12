import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import NotFoundError from "../../errors/NotFoundError";
import { Hotels, RoomCategory } from "../../models";

export const createRoomCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, roomNumbers, hotelId } = req.body;

    // Check if hotel exists
    const theHotel = await Hotels.findById(hotelId);

    if (!theHotel) {
      throw new NotFoundError("Hotel not found");
    }

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

export const updateRoomCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const updatedCat = await RoomCategory.findByIdAndUpdate(
      categoryId,
      { $set: req.body },
      { new: true }
    );

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "Room category data updated",
      data: updatedCat,
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

export const getAllHotelRoomCategories = async (
  req: Request,
  res: Response
) => {
  const { hotelId } = req.params;

  try {
    const hotel = await Hotels.findById(hotelId);

    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    const theCategories = await RoomCategory.find({ hotelId }).populate({
      path: "hotelId",
      select: "name",
    });

    return res.json({
      success: false,
      status: "Success",
      statusCode: 200,
      count: theCategories.length,
      message: `All Room categories found for ${hotel.name}`,
      data: theCategories,
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

export const getRoomCategoryById = async (req: Request, res: Response) => {
  try {
    const { hotelId, categoryId } = req.params;

    const roomCategory = await RoomCategory.findOne({
      _id: categoryId,
      hotelId,
    }).populate({ path: "hotelId" });

    if (!roomCategory) {
      throw new NotFoundError("Room Category not found");
    }

    return res.json({
      success: true,
      status: "Success",
      statusCode: 200,
      message: "Room category retrieved",
      data: roomCategory,
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

export const deleteRoomCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const theCategory = await RoomCategory.findById(categoryId);

    if (!theCategory) {
      throw new NotFoundError("Category not found");
    }

    await theCategory.remove();

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "Room Category deleted",
      data: theCategory,
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
