import { Sequelize, where } from "sequelize";
import { Location, PermissionStore, Store, User } from "../models/index.js";
import { codeValidator } from "../utils/validator.js";
import { validateUser } from "../utils/validateUser.js";

export const addStore = async (req, res) => {
    try {
        const { location, code, name, address, isHostelery } = req.body;
        if (!location && !code && !name && !isHostelery) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        if (!codeValidator(code)) {
            return res.status(400).json({ message: "El código de tienda solo debe contener letras y números sin espacios" });
        }

        await Store.create({ locationId: location, code, name, address, isHostelery });
        res.status(200).json({ message: "Tienda agregada correcamtente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getStores = async (req, res) => {
    const authorization = req.get("authorization");
    try {
        const token = validateUser(authorization);

        if (token.isAdmin) {
            const stores = await Store.findAll({
                include: [
                    {
                        model: Location,
                        attributes: ['code'], // Especifica las columnas que deseas devolver
                    }
                ]
            });

            // Extrae los IDs de las tiendas obtenidas en la primera consulta
            const storeIds = stores.map(store => store.id);
            const users = await PermissionStore.findAll({
                attributes: ['store_id'],
                where: { store_id: storeIds },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                raw: true,
                nest: true
            });

            const storesWithUsers = stores.map(store => {
                const usersInStore = users.filter(user => user.store_id === store.id).map(user => user.User.username);
                return { ...store.dataValues, user: usersInStore };
            });
            return res.status(200).json(storesWithUsers);
        }

        const stores = await Store.findAll({
            where: {
                [Sequelize.Op.or]: [
                    {
                        id: {
                            [Sequelize.Op.in]: Sequelize.literal(`(SELECT DISTINCT store_id FROM permission_stores WHERE user_id = ${token.id})`)
                        }
                    },
                    {
                        location_id: {
                            [Sequelize.Op.in]: Sequelize.literal(`(
                        SELECT DISTINCT P.location_id
                        FROM permission_locations P
                        INNER JOIN stores S
                        ON P.location_id = S.location_id 
                        WHERE P.user_id = ${token.id}
                        AND S.location_id = P.location_id
                      )`),
                        }
                    }
                ],
            },
            include: [
                {
                    model: Location,
                    attributes: ['code'], // Especifica las columnas que deseas devolver
                },
            ]
        });

        // Extrae los IDs de las tiendas obtenidas en la primera consulta
        const storeIds = stores.map(store => store.id);
        const users = await PermissionStore.findAll({
            attributes: ['store_id'],
            where: { store_id: storeIds },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            raw: true,
            nest: true
        });

        const storesWithUsers = stores.map(store => {
            const usersInStore = users.filter(user => user.store_id === store.id).map(user => user.User.username);
            return { ...store.dataValues, user: usersInStore };
        });

        res.status(200).json(storesWithUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getStoresById = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findOne({
            where: { id },
            include: [
                {
                    model: Location,
                    attributes: ['code']
                }
            ],
            raw: true,
            nest: true
        });

        const user = await PermissionStore.findAll({
            attributes: [],
            where: { store_id: store.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ],
            raw: true,
            nest: true
        });

        const storeWithUsers = { ...store, user };

        //store["user"] = user;
        res.status(200).json(storeWithUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}