import { Router } from "express";
import { getAdmins, addAdmin } from "../controllers/adminController.js";

const router = Router();

router.get("/", getAdmins);
router.post("/", addAdmin);

export default router;