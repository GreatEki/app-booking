import { Router } from "express";
import {
  addRoom,
  updateRoom,
  getAllRoomsByCategoryId,
  deleteRoom,
} from "./room.controller";

const router = Router();

router.route("/").post(addRoom);

router.route("/:roomId").put(updateRoom).delete(deleteRoom);

router.route("/:categoryId").get(getAllRoomsByCategoryId);

export default router;
