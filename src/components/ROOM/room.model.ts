import { Schema, model } from "mongoose";
import { RoomModelAttributes } from "./room.interface";

const RoomSchema: Schema = new Schema<RoomModelAttributes>(
  {
    roomNumber: { type: Number, required: true },
    roomCategoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "room_category",
    },
    price: { type: Number, required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: "hotel", required: true },
    maxPeopleAllowed: { type: Number, required: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Room = model("room", RoomSchema);

export default Room;
