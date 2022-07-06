import { Schema, model } from "mongoose";
import { HotelsModelAttribute } from "./hotels.interface";

const HotelSchema: Schema = new Schema<HotelsModelAttribute>(
  {
    name: { type: String, required: true },
    hotelType: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photo: { type: [String], required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    rooms: { type: String, required: true },
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Hotels = model<HotelsModelAttribute>("hotel", HotelSchema);

export default Hotels;
