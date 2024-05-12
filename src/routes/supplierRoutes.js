import { Router } from "express";
import { addSupplier, deleteSupplier, getSuppliers, updateSupplier } from "../controllers/supplierController.js";

const router = Router();

router.post("/", addSupplier);
router.get("/", getSuppliers);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;