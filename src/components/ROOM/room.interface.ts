import { Types } from "mongoose";

export interface RoomModelAttributes {
  roomNumber: number;
  roomCategoryId: Types.ObjectId;
  price: number;
  hotelId: Types.ObjectId;
  maxPeopleAllowed: number;
}
