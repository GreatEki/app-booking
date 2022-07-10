import { Router } from "express";
import { addRoom, updateRoom } from "./room.controller";

const router = Router();

router.route("/").post(addRoom);

router.route("/:roomId").put(updateRoom);

export default router;
