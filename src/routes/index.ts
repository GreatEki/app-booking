import { Router } from "express";
import UserRoutes from "../components/USER/user.router";

const router = Router();

router.use("/user", UserRoutes);

export default router;
