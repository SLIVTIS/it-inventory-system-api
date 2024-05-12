import { Router } from "express";
import { getArticles, addArticle, getArticlesByCategory, updateArticle, deleteArticle } from "../controllers/articlesController.js";


const router = Router();

router.get("/", getArticles);
router.get("/category/:categoryId", getArticlesByCategory);
router.post("/", addArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;