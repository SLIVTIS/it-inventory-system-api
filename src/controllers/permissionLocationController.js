import { PermissionLocation } from "../models/index.js";

export const addPermission = async (req, res) => {
    const { user, location } = req.body;
    try {
        if (!user && !location) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }

        await PermissionLocation.create({ UserId: user, locationId: location });
        return res.status(200).json({ message: "Permiso agregado correctamente" });
    } catch (error) {
        console.log("Error::PermissionLocationController::" + error);
        res.status(500).json("Error interno");
    }

}

export const removePermissionLocation = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        await PermissionLocation.destroy({ where: { id } });
        res.status(200).json({ message: "Permiso eliminado correctamente" });
    } catch (error) {
        console.log("Error::PermissionLocationController::" + error);
        res.status(500).json("Error interno");
    }
}