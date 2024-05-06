import Supplier from "../models/supplier.js";

export const addSupplier = async (req, res) => {
    try {
        const { code, name, description, telephone } = req.body;

        if (!(code != null && name != null)) {
            return res.status(400).json({ message: "Faltan datos, el codigo y nombre son obligatorios" });
        }
        if (!codeValidator(code)) {

            return res.status(400).json({ message: "El código de proveedor solo debe contener letras y números sin espacios" });
        }
        await Supplier.create({ code, name, description, telephone });

        res.status(200).json({ message: "Proveedor agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error interno" });
    }
}

function codeValidator(code) {
    code = code.toUpperCase();
    const regex = /^[A-Z0-9]+$/;
    return regex.test(code) && !/\s/.test(code);
}