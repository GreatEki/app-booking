import { Router } from "express";
import {
  createRoomCategory,
  getAllHotelRoomCategories,
} from "./roomCategory.controller";

const router = Router();

router.route("/:hotelId").post(createRoomCategory);

router.route("/:hotelId").get(getAllHotelRoomCategories);

export default router;
