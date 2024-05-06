import { Router } from "express";
import { getArticles, addArticle } from "../controllers/articlesController.js";


const router = Router();

router.get("/", getArticles);
router.post("/", addArticle);

export default router;