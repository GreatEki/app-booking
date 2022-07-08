import { Router } from "express";
import { createRoomCategory } from "./roomCategory.controller";

const router = Router();

router.route("/:hotelId").post(createRoomCategory);

export default router;
