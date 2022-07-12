import { Types } from "mongoose";

export interface RoomModelAttributes {
  roomNumber: string;
  roomCategoryId: Types.ObjectId;
  price: number;
  hotelId: Types.ObjectId;
  maxPeopleAllowed: number;
}
