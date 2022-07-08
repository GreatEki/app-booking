import { Schema, model } from "mongoose";
import { RoomModelAttributes } from "./room.interface";

const RoomSchema: Schema = new Schema<RoomModelAttributes>({
  roomNumber: { type: Number, required: true },
  roomCategoryId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  hotelId: { type: Schema.Types.ObjectId, required: true },
  maxPeopleAllowed: { type: Number, required: false },
});

const Room = model("room", RoomSchema);

export default Room;
