import { Article, Supplier, Categorie } from "../models/index.js"

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [
                {
                    model: Supplier,
                    attributes: ['name'], // Especifica las columnas que deseas devolver
                },
                {
                    model: Categorie,
                    attributes: ['name'], // Especifica las columnas que deseas devolver
                }
            ]
        });
        res.status(200).json(articles);
    } catch (error) {
        console.log(error);
        res.status(500).json("Error interno");
    }
}

export const addArticle = async (req, res) => {
    try {
        const { supplier, categorie, modelname, description } = req.body;

        if (!categorie && !modelname && !supplier) {
            return res.status(400).json({ message: "Faltan datos o son invalidos" });
        }
        await Article.create({ supplierId: supplier, categorieId: categorie, modelname, description });
        res.status(200).json({ message: "Articulo agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getArticlesByCategory = async (req, res) => {
    const categoryId = req.params.categoryId; // Obtén el ID de la categoría de los parámetros de la URL
    try {
        const articles = await Article.findAll({
            where: { categorieId: categoryId }, // Filtra los artículos por el ID de la categoría
            include: [
                {
                    model: Supplier,
                    attributes: ['name'], // Especifica las columnas que deseas devolver del modelo Supplier
                },
                {
                    model: Categorie,
                    attributes: ['name'], // Especifica las columnas que deseas devolver del modelo Categorie
                }
            ]
        });
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error al obtener los artículos por categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}