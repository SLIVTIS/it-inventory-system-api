import Countries from "../models/countries.js"

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
        const result = await Countries.create({ country, code });
        res.json(result);
    } catch (error) {
        console.error("Error al registrar el pais:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};