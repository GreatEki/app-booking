import { Request, Response } from "express";
import { User } from "../../models";
import NotFoundError from "../../errors/NotFoundError";

export const getUsers = async (req: Request, res: Response) => {
  const allUsers = await User.find({});
  res.json({
    success: true,
    status: "Success",
    statusCode: 200,
    message: "Users fetched succesfully",
    count: allUsers.length,
    data: allUsers.map((user) => {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    }),
  });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    // const { password, ...otherDetails } = updatedUser;
    return res.json({
      success: true,
      status: "OK",
      statusCode: 200,
      message: "User Information updated",
      data: updatedUser,
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const theUser = await User.findById({ _id: userId });

    if (!theUser) {
      throw new NotFoundError("User not found");
    }

    if (theUser) {
      return res.json({
        success: true,
        status: "OK",
        statusCode: 200,
        message: "User retrieved successfully",
        data: {
          id: theUser._id,
          username: theUser.username,
          email: theUser.email,
          isAdmin: theUser.isAdmin,
        },
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const delUser = await User.findByIdAndDelete({ _id: userId });

    if (!delUser) {
      throw new NotFoundError("No user with id found");
    }

    return res.json({
      success: true,
      status: "OK",
      statusCode: 204,
      message: "User Deleted",
      data: delUser,
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
