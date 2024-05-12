import { Location, Countries, PermissionLocation, User } from "../models/index.js";
import { codeValidator } from "../utils/validator.js";
import { Sequelize } from "sequelize";

export const addLocation = async (req, res) => {
    try {
        const { country, state, name, code } = req.body;

        if (!country && !state && !name && !code) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        if (!codeValidator(code)) {
            return res.status(400).json({ message: "El código de ubicación solo debe contener letras y números sin espacios" });
        }
        await Location.create({ CountryId: country, state, name, code });
        res.status(200).json({ message: "Ubicacion agregada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getLocations = async (req, res) => {
    try {
        const locations = await Location.findAll({
            include: [
                {
                    model: Countries,
                    attributes: ['code'], // Especifica las columnas que deseas devolver
                }
            ],
            raw: true,
            nest: true
        });

        const users = await Location.findAll({
            attributes: ['id'],
            where: {
                id: {
                    [Sequelize.Op.in]: Sequelize.literal('(SELECT DISTINCT location_id FROM permission_locations)'),
                },
            },
            include: [
                {
                    model: PermissionLocation,
                    attributes: ['id'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'username'],
                        },
                    ],
                },
            ],
            raw: true,
            nest: true
        });

        const locationsWithUsername = locations.map(location => {
            // Verificar si la ubicación tiene una propiedad 'id'
            if (location.id) {
                // Buscar el usuario correspondiente en el array de users
                const user = users.filter(user => user.id === location.id);
                //const user = users.find(user => user.id === location.id);
                // Si se encuentra un usuario, agregar el campo 'username' a la ubicación
                if (user) {
                    const u = user.map(user => user.permissionLocations);
                    return { ...location, user: u };
                }
            }
            // Si no se encuentra un usuario o la ubicación no tiene un ID, devolver la ubicación sin cambios
            return location;
        });
        res.status(200).json(locationsWithUsername);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}