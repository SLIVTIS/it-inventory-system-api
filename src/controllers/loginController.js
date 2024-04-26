import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { emailValidator } from "../utils/validatorLogin.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
        return res.status(401).json({ "message": 'Usuario o contraseña incorrectos' });
    } else if (!emailValidator(email)) {
        return res.status(401).json({ "message": 'Introduce un email valido' });
    }

    try {
        const userAdmin = await Admin.findOne({ where: { email: email }, and: { active: true } });

        if (userAdmin !== null) {
            let isLogin = await bcrypt.compare(password, userAdmin.password);
            if (isLogin) {
                const adminToken = {
                    id: userAdmin.id,
                    username: userAdmin.username
                }

                const token = jwt.sign(adminToken, config.spassword);

                res.status(200).json({
                    "username": userAdmin.username,
                    "email": userAdmin.email,
                    "type": 'admin',
                    "token": token
                });
            } else {
                res.status(401).json({ "message": 'Usuario o contraseña incorrectos' });
            }
        } else {
            //Aqui se hace el login de los tecnicos
            res.status(401).json({ "message": 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Error interno");
    }
}