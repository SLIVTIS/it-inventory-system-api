import { Router } from "express";
import { addStock, getStock, getStockByStore, getStockUnassigned } from "../controllers/stockController.js";

const router = Router();

router.get("/", getStock);
router.get("/unassigned", getStockUnassigned);
router.get("/:storeId", getStockByStore);
router.post("/", addStock);

export default router;