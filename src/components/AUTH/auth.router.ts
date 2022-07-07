import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";
import { valReqisterUser } from "./auth.validation";

const router = Router();

router.route("/register").post(valReqisterUser, registerUser);

router.route("/login").post(loginUser);

export default router;
