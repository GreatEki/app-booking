import { Schema, model } from "mongoose";
import { UserModelAttributes } from "./user.interface";

const UserSchema: Schema = new Schema<UserModelAttributes>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model<UserModelAttributes>("user", UserSchema);

export default User;
