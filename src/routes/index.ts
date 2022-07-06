import { Router } from "express";
import UserRoutes from "../components/USER/user.router";
import HotelRoutes from "../components/HOTELS/hotels.router";

const router = Router();

router.use("/user", UserRoutes);
router.use("/hotels", HotelRoutes);

export default router;
