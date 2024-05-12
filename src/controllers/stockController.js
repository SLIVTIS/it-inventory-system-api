import { Stock, Article, Supplier, Categorie, StockMovements, StateMovement, StockStore } from "../models/index.js";
import { Sequelize } from "sequelize";
import { cleanJSON } from "../utils/flattenJson.js";

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
        const stocks = await Stock.findAll({
            include: [
                {
                    model: Article,
                    attributes: ['id', 'modelname'],
                    include: [
                        {
                            model: Supplier,
                            attributes: ['id', 'name'], // Incluir solo el nombre del proveedor
                        },
                        {
                            model: Categorie,
                            attributes: ['id', 'name'], // Incluir solo el nombre de la categoría
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

        //Clean JSON
        const stock = [];
        stocks.forEach(element => {
            const data = {
                id: element.id,
                serie: element.serie,
                comment: element.comment,
                categorie: element.article.categorie.name,
                supplier: element.article.supplier.name,
                modelname: element.article.modelname
            }
            stock.push(data);
        });
        res.status(200).json(stock);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getStockByStore = async (req, res) => {
    const storeId = req.params.storeId; // Obtén el ID de la categoría de los parámetros de la URL
    try {
        const stocks = await StockStore.findAll({
            where: { storeId: storeId },
            include: [
                {
                    model: Stock,
                    attributes: ['id', 'serie'],
                    include: [
                        {
                            model: Article,
                            attributes: ['modelname'],
                            include: [
                                {
                                    model: Supplier,
                                    attributes: ['name'], // Incluir solo el nombre de la categoría
                                },
                                {
                                    model: Categorie,
                                    attributes: ['name'], // Incluir solo el nombre de la categoría
                                }
                            ]
                        }
                    ]
                }, {
                    model: StockMovements,
                    attributes: [],
                    include: [
                        {
                            model: StateMovement,
                            attributes: ['id', 'status']
                        }
                    ]
                }
            ],
            raw: true, nest: true
        });

        //Clean JSON
        const stock = [];
        stocks.forEach(element => {
            const data = {
                id: element.stockId,
                stockStoreId: element.id,
                stockMovementId: element.stockMovementId,
                storeId: element.storeId,
                statusId: element.stockMovement.stateMovement.id,
                status: element.stockMovement.stateMovement.status,
                serie: element.stock.serie,
                comment: element.comment,
                categorie: element.stock.article.categorie.name,
                supplier: element.stock.article.supplier.name,
                modelname: element.stock.article.modelname
            }
            stock.push(data);
        });
        res.status(200).json(stock);
    } catch (error) {
        console.log("Error al obtener stock de tiendas: " + error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const updateStock = async (req, res) => {
    const { id } = req.params;
    const { article, serie, comment } = req.body;
    try {
        if (!(id && article && serie)) {
            return res.status(400).json({ message: "Faltan datos, el articulo y serie son obligatorios" });
        }
        await Stock.update({ articleId: article, serie, comment }, { where: { id } });
        res.status(200).json({ message: "Articulo actualizado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const deleteStock = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Faltan datos, el id es obligatorio" });
        }
        await Stock.update({ active: false }, { where: { id } });
        res.status(200).json({ message: "Articulo eliminado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}
