import { Router } from "express";
import UserRoutes from "../components/USER/user.router";
import HotelRoutes from "../components/HOTELS/hotels.router";
import AuthRoutes from '../components/AUTH/auth.router';

const router = Router();

router.use("/user", UserRoutes);
router.use("/hotels", HotelRoutes);
router.use("/auth", AuthRoutes);

export default router;
