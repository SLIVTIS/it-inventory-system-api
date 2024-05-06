import { Categorie } from "../models/index.js";

export const addCategorie = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            console.log("Faltan datos");
            return res.status(400).json({ message: "Faltan datos o son invalidos" });
        }

        await Categorie.create({ name });

        res.status(200).json({ message: "Categoria agregada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();

        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}