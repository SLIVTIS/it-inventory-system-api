import { Sequelize, where } from "sequelize";
import { Article, Supplier, Categorie, Store, Stock, StockStore, Location } from "../models/index.js"

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { active: true },
            include: [
                {
                    model: Supplier,
                    attributes: ['id', 'name'], // Especifica las columnas que deseas devolver
                },
                {
                    model: Categorie,
                    attributes: ['id', 'name'], // Especifica las columnas que deseas devolver
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

export async function getArticleByStore(storeId) {
    try {
        const store = await Store.findAll({
            attributes: ['code', 'location_id'],
            where: {
                id: storeId
            },
            include: [
                {
                    model: StockStore,
                    attributes: [],
                    include: [
                        {
                            model: Stock,
                            attributes: ['serie'],
                            include: [
                                {
                                    model: Article,
                                    attributes: ['modelname'],
                                    include: [
                                        {
                                            model: Supplier,
                                            attributes: ['name']
                                        },
                                        {
                                            model: Categorie,
                                            attributes: ['name']
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    model: Location,
                    attributes: ['name']
                }
            ],
            raw: true,
            nest: true
        });
        return store;
    } catch (error) {
        console.log("Error al obtener stock de tiendas: " + error);
        return [];
    }
}

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { supplier, categorie, modelname, description } = req.body;
    try {
        if (!(id && supplier && categorie && modelname)) {
            return res.status(400).json({ message: "Faltan datos o son invalidos" });
        }

        await Article.update({ supplierId: supplier, categorieId: categorie, modelname, description }, { where: { id } });
        res.status(200).json({ message: "Articulo actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Faltan datos o son invalidos" });
        }

        await Article.update({ active: false }, { where: { id } });
        res.status(200).json({ message: "Articulo eliminado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}