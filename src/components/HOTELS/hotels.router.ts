import { Router } from "express";
import { createHotel } from "./hotels.controller";

const router = Router();

router.route("/").post(createHotel);

export default router;
