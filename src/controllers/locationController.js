import { Location, Countries } from "../models/index.js";
import { codeValidator } from "../utils/validator.js";

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
                },
            ]
        });
        res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}