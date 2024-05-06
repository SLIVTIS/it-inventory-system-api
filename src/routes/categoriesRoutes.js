import { Router } from "express";
import { addCategorie, getCategories } from "../controllers/categorieController.js";

const router = Router();

router.get("/", getCategories);
router.post("/", addCategorie);

export default router;