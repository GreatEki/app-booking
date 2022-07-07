import { Router } from "express";
import { registerUser } from "./auth.controller";
import { valReqisterUser } from "./auth.validation";

const router = Router();

router.route("/register").post(valReqisterUser, registerUser);

export default router;
