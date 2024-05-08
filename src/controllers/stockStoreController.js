import { StockStore, Stock, Article, Supplier, Categorie } from "../models/index.js";
import config from "../config.js";
import jwt from "jsonwebtoken";
import { addState } from "./stateMovementController.js";
import { addMovement } from "./stockMovementController.js";

export const getStockStore = async (req, res) => {
    try {
        const stock = await StockStore.findAll();
        res.status(200).json(stock);
    } catch (error) {
        console.log("Error al obtener stock de tiendas: " + error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getStockByStore = async (req, res) => {
    const storeId = req.params.storeId; // Obtén el ID de la categoría de los parámetros de la URL
    try {
        const stock = await StockStore.findAll({
            where: { storeId: storeId },
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
                                    attributes: ['name'], // Incluir solo el nombre de la categoría
                                },
                                {
                                    model: Categorie,
                                    attributes: ['name'], // Incluir solo el nombre de la categoría
                                }
                            ]
                        }
                    ]
                }
            ],
            raw: true, nest: true
        });
        res.status(200).json(stock);
    } catch (error) {
        console.log("Error al obtener stock de tiendas: " + error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const addStockStore = async (req, res) => {
    const authorization = req.get("authorization");
    const { storeId, stock, comment } = req.body;
    try {
        if (!storeId && !stock) {
            return res.status(400).json({ message: "Falta Id de tienda o id de stock" });
        }
        for (const element of stock) {
            const user = validateUser(authorization);
            const state = await addState(user);
            if (!state) {
                return res.status(400).json({ message: "Error al agregar el stock" });
            }
            const movement = await addMovement(element, storeId, state.id, user);
            if (!movement) {
                return res.status(400).json({ message: "Error al agregar el stock" });
            }

            await StockStore.create({ stockMovementId: movement.id, storeId, stockId: element, comment });
        }
        res.status(200).json({ message: "Articulos agregado correctamente" });
    } catch (error) {
        console.log("ERROR::StockStoreController::" + error);
        res.status(500).json("Error interno");
    }
}


//----------------------------------
function validateUser(authorization) {

    let token = null;

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    if (token !== null) {
        try {
            const decodeToken = jwt.verify(token, config.spassword);
            if (!decodeToken.id) {
                return 'Token missing or invalid';
            }
            return decodeToken;
        } catch (error) {
            console.error("Error::Token:", error);
            return 'Token missing or invalid';
        }

    } else {
        return 'Token missing or invalid';
    }
};