import { Router } from "express";
import UserRoutes from "../components/USER/user.router";
import HotelRoutes from "../components/HOTELS/hotels.router";
import RoomCategoryRoutes from "../components/ROOM_CATEGORY/roomCategory.router";
import RoomRoutes from "../components/ROOM/room.router";
import FileRoutes from "../components/FILE/file.router";

const router = Router();

router.use("/users", UserRoutes);
router.use("/hotels", HotelRoutes);
router.use("/room-category", RoomCategoryRoutes);
router.use("/room", RoomRoutes);
router.use("/file", FileRoutes);

export default router;
