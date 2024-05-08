import { Router } from "express";
import { addStore, getStores } from "../controllers/storeController.js";

const router = Router();

router.get("/", getStores);
router.post("/", addStore);

export default router;