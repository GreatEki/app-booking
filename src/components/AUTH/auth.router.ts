import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";
import { valReqisterUser, valLoginUser } from "./auth.validation";

const router = Router();

router.route("/register").post(valReqisterUser, registerUser);

router.route("/login").post(valLoginUser, loginUser);

export default router;
