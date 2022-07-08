import { Types } from "mongoose";

export interface RoomCategoryModelAttributes {
  name: string;
  description: string;
  hotelId: Types.ObjectId;
  roomNumbers: any[];
}
