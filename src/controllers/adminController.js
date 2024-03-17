import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).json("Error al obtener los admins");
    }
}

export const addAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 8);
        await Admin.create({ username, email, password: hashedPass });
        res.status(200).json("Usuario creado con exito");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error al crear admin");
    }
}