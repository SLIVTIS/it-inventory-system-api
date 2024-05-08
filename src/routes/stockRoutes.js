import { Router } from "express";
import { addStock, getStock, getStockUnassigned } from "../controllers/stockController.js";

const router = Router();

router.get("/", getStock);
router.get("/unassigned", getStockUnassigned);
router.post("/", addStock);

export default router;