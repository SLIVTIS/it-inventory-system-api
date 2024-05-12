import { Router } from "express";
import { addStock, deleteStock, getStock, getStockByStore, getStockUnassigned, updateStock } from "../controllers/stockController.js";

const router = Router();

router.get("/", getStock);
router.get("/unassigned", getStockUnassigned);
router.get("/:storeId", getStockByStore);
router.post("/", addStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;