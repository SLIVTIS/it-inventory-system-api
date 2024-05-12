import { PermissionStore } from "../models/index.js";

export const addPermissionStore = async (req, res) => {
    const { userId, storeId } = req.body;
    try {
        if (!userId && !storeId) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }

        await PermissionStore.create({ UserId: userId, storeId });
        return res.status(200).json({ message: "Permiso agregado correctamente" });
    } catch (error) {
        console.log("Error::PermissionLocationController::" + error);
        res.status(500).json("Error interno");
    }

}

export const removePermission = async (req, res) => {
    const { userId } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({ message: "Datos invalidos o faltantes" });
        }
        await PermissionStore.destroy({ where: { UserId: userId } });
        res.status(200).json({ message: "Permiso eliminado correctamente" });
    } catch (error) {
        console.log("Error::PermissionStoreController::" + error);
        res.status(500).json("Error interno");
    }
}