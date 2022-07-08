import { Schema, model } from "mongoose";
import { RoomCategoryModelAttributes } from "./roomCategory.interface";

const RoomCategorySchema: Schema = new Schema<RoomCategoryModelAttributes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    hotelId: { type: Schema.Types.ObjectId, required: true },
    roomNumbers: { type: [], required: false },
  },
  {
    timestamps: true,
  }
);

const RoomCategory = model<RoomCategoryModelAttributes>(
  "room_category",
  RoomCategorySchema
);

export default RoomCategory;
