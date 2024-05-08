import Countries from "../models/countries.js"
import { codeValidator } from "../utils/validator.js";

export const getCountries = async (req, res) => {
    try {
        const countries = await Countries.findAll();
        res.json(countries);
    } catch (error) {
        console.error("Error al obtener los países:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addCountry = async (req, res) => {
    const { country, code } = req.body;

    try {
        if (!country && !code) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        if (!codeValidator(code)) {
            return res.status(400).json({ message: "El código de país solo debe contener letras y números sin espacios" });
        }
        const result = await Countries.create({ country, code });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al registrar el pais:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};