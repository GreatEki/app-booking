import { Router } from "express";
// import { upload } from "../../config/fsUploadStorage";
import { uploadHandler } from "./file.controller";

const router = Router();

router.route("/upload").post(uploadHandler);

export default router;
