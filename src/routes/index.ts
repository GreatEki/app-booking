import { Router } from "express";
import UserRoutes from "../components/USER/user.router";
import HotelRoutes from "../components/HOTELS/hotels.router";
import AuthRoutes from "../components/AUTH/auth.router";
import RoomCategoryRoutes from "../components/ROOM_CATEGORY/roomCategory.router";
import RoomRoutes from "../components/ROOM/room.router";

const router = Router();

router.use("/users", UserRoutes);
router.use("/hotels", HotelRoutes);
router.use("/auth", AuthRoutes);
router.use("/room-category", RoomCategoryRoutes);
router.use("/room", RoomRoutes);

export default router;
