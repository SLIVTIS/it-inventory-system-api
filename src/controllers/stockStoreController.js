import { StockStore, Stock, Article, Supplier, Categorie, StockMovements, StateMovement } from "../models/index.js";
import { validateUser } from "../utils/validateUser.js";
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

export const addStockStore = async (req, res) => {
    const authorization = req.get("authorization");
    const { storeId, stock, comment } = req.body;
    try {
        if (!storeId && !stock) {
            return res.status(400).json({ message: "Falta Id de tienda o id de stock" });
        }
        for (const element of stock) {
            const user = validateUser(authorization);
            const state = await addState(user, comment, storeId);
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

export const addReassignStore = async (req, res) => {
    const authorization = req.get("authorization");
    const { storeId, status, statusId, stockId, stockStoreId } = req.body;
    try {
        if (!storeId && !status && !statusId && !stockId && !stockStoreId) {
            return res.status(400).json({ message: "Falta Id de tienda o id de stock" });
        }

        //Si el estado es pendiente, se actualiza el estado a rechazado
        if (status === "pendiente") {
            await StateMovement.update({ status: "rechazada" }, { where: { id: statusId } });
        }

        //Se elimina el stock de la tienda
        await StockStore.destroy({ where: { id: stockStoreId } });

        const user = validateUser(authorization);
        const state = await addState(user, "", storeId);
        if (!state) {
            return res.status(400).json({ message: "Error al agregar el stock" });
        }
        const movement = await addMovement(stockId, storeId, state.id, user);
        if (!movement) {
            return res.status(400).json({ message: "Error al agregar el stock" });
        }

        await StockStore.create({ stockMovementId: movement.id, storeId, stockId, comment: "" });

        res.status(200).json({ message: "Articulos agregado correctamente" });
    } catch (error) {
        console.log("ERROR::StockStoreController::" + error);
        res.status(500).json("Error interno");
    }
}

