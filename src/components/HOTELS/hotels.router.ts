import { Router } from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
} from "./hotels.controller";

const router = Router();

router.route("/").post(createHotel).get(getAllHotels);
router
  .route("/:hotelId")
  .get(getHotelById)
  .put(updateHotel)
  .delete(deleteHotel);

export default router;
