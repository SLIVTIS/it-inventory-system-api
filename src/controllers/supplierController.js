import { where } from "sequelize";
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
        const suppliers = await Supplier.findAll({ where: { active: true } });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error interno" });
    }
}

export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { code, name, description, telephone } = req.body;
    try {
        console.log(id, code, name, description, telephone);
        if (!(id && code && name)) {
            return res.status(400).json({ message: "Faltan datos, el código y nombre son obligatorios" });
        }
        if (!codeValidator(code)) {
            return res.status(400).json({ message: "El código de proveedor solo debe contener letras y números sin espacios" });
        }

        await Supplier.update({ code, name, description, telephone }, { where: { id } });
        res.status(200).json({ message: "Proveedor actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

export const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Faltan datos, el id es obligatorio" });
        }

        await Supplier.update({ active: false }, { where: { id } });
        res.status(200).json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" });
    }
}

function codeValidator(code) {
    code = code.toUpperCase();
    const regex = /^[A-Z0-9]+$/;
    return regex.test(code) && !/\s/.test(code);
}