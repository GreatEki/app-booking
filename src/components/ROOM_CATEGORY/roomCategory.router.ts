import { Router } from "express";
import {
  createRoomCategory,
  deleteRoomCategory,
  getAllHotelRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
} from "./roomCategory.controller";

import { valCreateRoomCategory } from "./roomCategory.validation";

const router = Router();

router.route("/").post(valCreateRoomCategory, createRoomCategory);

router.route("/:hotelId").get(getAllHotelRoomCategories);

router.route("/hotel/:hotelId/category/:categoryId").get(getRoomCategoryById);

router.route("/:categoryId").put(updateRoomCategory).delete(deleteRoomCategory);

export default router;
