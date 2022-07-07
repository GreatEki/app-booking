import { Router } from "express";
import {
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
} from "./user.controller";

const router = Router();

router.route("/").get(getUsers);

router.route("/:userId").put(updateUser).get(getUserById).delete(deleteUser);

export default router;
