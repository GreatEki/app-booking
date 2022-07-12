import { Router } from "express";
import {
  addRoom,
  updateRoom,
  getAllRoomsByCategoryId,
  deleteRoom,
  getAllRooms,
} from "./room.controller";

const router = Router();

router.route("/").post(addRoom).get(getAllRooms);

router.route("/:roomId").put(updateRoom).delete(deleteRoom);

router.route("/:categoryId").get(getAllRoomsByCategoryId);

export default router;
