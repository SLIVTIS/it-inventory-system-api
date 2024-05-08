import { Router } from "express";
import { addStockStore, getStockByStore, getStockStore } from "../controllers/stockStoreController.js";

const router = Router();

router.get("/", getStockStore);
router.get("/:storeId", getStockByStore);
router.post("/", addStockStore);
export default router;