import bcrypt from "bcrypt";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`${username} ${email} ${password}`);
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        await User.create({ username, email, password: hashedPassword });
        res.status(200).json("Usuario creado con exito");
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};