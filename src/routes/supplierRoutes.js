import { Router } from "express";
import { addSupplier, getSuppliers } from "../controllers/supplierController.js";

const router = Router();

router.post("/", addSupplier);
router.get("/", getSuppliers);

export default router;