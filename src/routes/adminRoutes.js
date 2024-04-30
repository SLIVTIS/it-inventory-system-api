import { Router } from "express";
import { getAdmins, getUsers, addUser } from "../controllers/adminController.js";

const router = Router();

router.get("/", getAdmins);
router.get("/users", getUsers);
router.post("/", addUser);

export default router;