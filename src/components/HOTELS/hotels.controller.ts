import { Request, Response } from "express";
import { Hotels } from "../../models";
import NotFoundError from "../../errors/NotFoundError";

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

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    const updateHotelData = await Hotels.findByIdAndUpdate(
      hotelId,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "Hotel Information updated",
      data: updateHotelData,
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

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const theHotel = await Hotels.findById({ _id: hotelId });

    if (!theHotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (theHotel) {
      return res.json({
        success: true,
        status: "OK",
        statusCode: 200,
        message: "Hotel retrieved successfully",
        data: theHotel,
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotels.find();

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      count: hotels.length,
      message: "Hotels retrieved successfully",
      data: hotels,
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

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    const delHotel = await Hotels.findByIdAndDelete({ _id: hotelId });

    if (!delHotel) {
      throw new NotFoundError("No hotel with id found");
    }

    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "Hotel Deleted",
      data: delHotel,
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
