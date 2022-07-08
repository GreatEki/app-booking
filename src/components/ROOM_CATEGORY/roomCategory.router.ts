import { Router } from "express";
import {
  createRoomCategory,
  getAllHotelRoomCategories,
  getRoomCategoryById,
} from "./roomCategory.controller";

const router = Router();

router.route("/:hotelId").post(createRoomCategory);

router.route("/:hotelId").get(getAllHotelRoomCategories);

router.route("/hotel/:hotelId/category/:categoryId").get(getRoomCategoryById);

export default router;
