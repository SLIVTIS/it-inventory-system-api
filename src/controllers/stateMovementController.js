import { Sequelize, json } from "sequelize";
import { StateMovement, PermissionStore, PermissionLocation, Store, Location, Stock, Article, Supplier, StockMovements } from "../models/index.js";
import { flattenJson } from "../utils/flattenJson.js";
import { validateUser } from "../utils/validateUser.js";

export async function addState(user, comment, storeId) {
    try {
        let state = null;
        if (!user) {
            return false;
        }

        const storesPermissionExists = await PermissionStore.findOne({ where: { storeId: storeId } });
        const store = await Store.findOne({
            where: { id: storeId },
            include: [
                {
                    model: Location,
                    attributes: ['id'], // Especifica las columnas que deseas devolver
                },
            ]
        });
        const locationPermissionExists = await PermissionLocation.findOne({ where: { locationId: store.location.id } });
        let status = "aceptada"; // Estado predeterminado

        if (storesPermissionExists || locationPermissionExists) {
            status = "pendiente";
        }

        if (user.isAdmin && status === "aceptada") {
            state = await StateMovement.create({ adminId: user.id, status, comment });
        } else {
            state = await StateMovement.create({ status, comment });
        }

        return state;
    } catch (error) {
        console.log("Error::StateMovementController::" + error);
        return false
    }
}

export const getStatesPendingByUser = async (req, res) => {
    const authorization = req.get("authorization");
    try {
        const token = validateUser(authorization);
        if (token.isAdmin) {
            return res.status(200).json({ message: "Los administradores no cuentan con estados de movimiento" });
        }
        const states = await StateMovement.findAll({
            attributes: ['id', 'status', 'comment', 'created_at'],
            where: {
                [Sequelize.Op.and]: [
                    {
                        id: {
                            [Sequelize.Op.in]: Sequelize.literal('(SELECT DISTINCT state_movement_id FROM stock_movements)'),
                        },
                    },
                    {
                        status: 'pendiente',
                    },
                ],
            },
            include: [
                {
                    model: StockMovements,
                    attributes: ['store_id'],
                    where: {
                        [Sequelize.Op.or]: [
                            {
                                store_id: {
                                    [Sequelize.Op.in]: Sequelize.literal(`(SELECT DISTINCT store_id FROM permission_stores WHERE user_id = ${token.id})`),
                                },
                            },
                            {
                                store_id: {
                                    [Sequelize.Op.in]: Sequelize.literal(`(
                                      SELECT DISTINCT S.id
                                      FROM stores S
                                      INNER JOIN permission_locations P
                                      ON S.location_id = P.location_id 
                                      WHERE P.user_id = ${token.id}
                                      AND S.location_id = P.location_id
                                    )`),
                                }
                            }
                        ]
                    },
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
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            model: Store,
                            attributes: ['code', 'name']
                        }
                    ],
                },
            ],
            raw: true,
            nest: true
        });

        res.status(200).json(states);
    } catch (error) {
        console.log("Error::StateMovementController::" + error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const updateState = async (req, res) => {
    const authorization = req.get("authorization");
    const { stateId, status, comment } = req.body;
    try {
        const token = validateUser(authorization);
        if (!stateId && !status) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }

        if (status !== 'pendiente' && status !== 'aceptada' && status !== 'rechazada') {
            return res.status(404).json({ message: "Estado no encontrado." });
        }

        // Actualizar el estado
        if (token.isAdmin) {
            await StateMovement.update(
                { status, comment, adminId: token.id },
                { where: { id: stateId } }
            );
        } else {
            await StateMovement.update(
                { status, comment, userId: token.id },
                { where: { id: stateId } }
            );
        }

        res.status(200).json({ message: "Estado actualizado correctamente" });
    } catch (error) {
        console.log("ERROR::StateMovementController::UpdateState::" + error);
        res.status(500).json("Error interno");
    }
}


export const resetState = async (req, res) => {
    const authorization = req.get("authorization");
    const { stateId, status, comment } = req.body;
    try {
        const token = validateUser(authorization);
        if (!stateId && !status) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }

        if (status !== 'pendiente' && status !== 'aceptada' && status !== 'rechazada') {
            return res.status(404).json({ message: "Estado no encontrado." });
        }

        await StateMovement.update(
            { status: 'pendiente', comment, adminId: null, userId: null },
            { where: { id: stateId } }
        );

        res.status(200).json({ message: "Estado reiniciado correctamente" });
    } catch (error) {
        console.log("ERROR::StateMovementController::UpdateState::" + error);
        res.status(500).json("Error interno");
    }
}

