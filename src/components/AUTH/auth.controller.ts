import { Request, Response } from "express";
import { User } from "../../models";
import BadRequestError from "../../errors/BadRequestError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    // compare passwords

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // // Generate token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      `${process.env.JWT_SECRET}`
    );

    return res.cookie("access_token", token, { httpOnly: true }).json({
      status: "Successful",
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },
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
