import { Router } from "express";
import { addReassignStore, addStockStore, getStockStore } from "../controllers/stockStoreController.js";

const router = Router();

router.get("/", getStockStore);
router.post("/", addStockStore);
router.post("/reassign", addReassignStore);
export default router;