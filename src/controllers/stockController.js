import { Stock, Article, Supplier, Categorie } from "../models/index.js";
import { Sequelize } from "sequelize";

export const addStock = async (req, res) => {
    try {
        const { article, serie, comment } = req.body;

        if (!article && !serie) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        await Stock.create({ articleId: article, serie, comment });
        res.status(200).json({ message: "Articulo agregado a stock general" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error interno" });
    }
}

export const getStock = async (req, res) => {
    try {
        //const stock = await Stock.findAll();
        const stocks = await Stock.findAll({
            include: [
                {
                    model: Article,
                    attributes: ['modelname'],
                    include: [
                        {
                            model: Supplier,
                            attributes: ['name'], // Incluir solo el nombre del proveedor
                        },
                        {
                            model: Categorie,
                            attributes: ['name'], // Incluir solo el nombre de la categoría
                        }
                    ]
                }
            ]
        });
        res.status(200).json(stocks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getStockUnassigned = async (req, res) => {
    try {
        const stocks = await Stock.findAll({
            where: {
                id: {
                    [Sequelize.Op.notIn]: Sequelize.literal('(SELECT stock_id FROM stock_stores)')
                }
            },
            include: [
                {
                    model: Article,
                    attributes: ['modelname'],
                    include: [
                        {
                            model: Supplier,
                            attributes: ['name'], // Incluir solo el nombre del proveedor
                        },
                        {
                            model: Categorie,
                            attributes: ['name'], // Incluir solo el nombre de la categoría
                        }
                    ]
                }
            ]
        });
        res.status(200).json(stocks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}