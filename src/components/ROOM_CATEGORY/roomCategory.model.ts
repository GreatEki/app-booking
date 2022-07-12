import { Schema, model } from "mongoose";
import { RoomCategoryModelAttributes } from "./roomCategory.interface";
import { Room } from "../../models";

const RoomCategorySchema: Schema = new Schema<RoomCategoryModelAttributes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    hotelId: { type: Schema.Types.ObjectId, required: true, ref: "hotel" },
    roomNumbers: { type: [], required: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const RoomCategory = model<RoomCategoryModelAttributes>(
  "room_category",
  RoomCategorySchema
);

RoomCategorySchema.pre("remove", async function (next) {
  const roomCat = this;
  await Room.deleteMany({ roomCategoryId: roomCat._id });

  next();
});

export default RoomCategory;
