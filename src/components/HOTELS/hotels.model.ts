import { Schema, model } from "mongoose";
import { HotelsModelAttribute } from "./hotels.interface";

const HotelSchema: Schema = new Schema<HotelsModelAttribute>(
  {
    name: { type: String, required: true },
    hotelType: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: false },
    photo: { type: [String], required: false },
    rating: { type: Number, required: false, min: 0, max: 5 },
    rooms: {
      type: [],
      required: false,
      ref: "room",
    },
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, required: false },
    motto: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Hotels = model<HotelsModelAttribute>("hotel", HotelSchema);

export default Hotels;
