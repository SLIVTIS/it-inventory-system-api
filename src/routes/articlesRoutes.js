import { Router } from "express";
import { getArticles, addArticle, getArticlesByCategory } from "../controllers/articlesController.js";


const router = Router();

router.get("/", getArticles);
router.get("/category/:categoryId", getArticlesByCategory);
router.post("/", addArticle);

export default router;