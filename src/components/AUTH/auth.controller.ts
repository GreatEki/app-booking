import { Request, Response } from "express";
import { User } from "../../models";
import BadRequestError from "../../errors/BadRequestError";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists via email and username
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError("Sorry user with email already exists");
    }

    // Check is username exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      throw new BadRequestError("Username already taken");
    }

    // Generate Hash for password
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();

    return res.json({
      status: "Created",
      statusCode: 201,
      message: "Registration successful",
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
