import { Location, Store } from "../models/index.js";
import { codeValidator } from "../utils/validator.js";

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
    try {
        const stores = await Store.findAll({
            include: [
                {
                    model: Location,
                    attributes: ['code'], // Especifica las columnas que deseas devolver
                },
            ]
        });
        res.status(200).json(stores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}