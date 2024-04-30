import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import User from "../models/user.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        const listAdmins = [];
        // Iteramos sobre la lista original de administradores
        admins.forEach(admin => {
            // Creamos un nuevo objeto JSON con solo las propiedades requeridas
            const adminJson = {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                isAdmin: true
            };
            // Agregamos el nuevo objeto JSON a la nueva lista
            listAdmins.push(adminJson);
        });
        res.status(200).json(listAdmins);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Error al obtener los admins" });
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

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        let userList = [];
        users.forEach(user => {
            // Creamos un nuevo objeto JSON con solo las propiedades requeridas
            const userJson = {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: false
            };
            // Agregamos el nuevo objeto JSON a la nueva lista
            userList.push(userJson);
        });
        res.json(userList);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addUser = async (req, res) => {
    const { username, email, password, permissions } = req.body;
    try {
        const usuario = {
            username: username,
            email: email,
            password: password,
            permissions: permissions
        };

        if (validarUsuario(usuario)) {
            // Verificar que el username solo contenga letras, números y puntos
            if (!/^[a-zA-Z0-9.]+$/.test(usuario.username)) {
                return res.status(400).json({ "message": "El username solo puede contener letras, números y puntos." });
            }

            // Convertir el username a minúsculas
            const userLower = username.toLowerCase();

            if (usuario.permissions === "user") {
                const hashedPass = await bcrypt.hash(password, 8);
                await User.create({ username: userLower, email: email, password: hashedPass });

            } else if (usuario.permissions === "admin") {
                const hashedPass = await bcrypt.hash(password, 8);
                await Admin.create({ username: userLower, email: email, password: hashedPass });
            }
        } else {
            return res.status(400).json({ "message": 'Datos de usuario invalidos' });
        }
        res.status(200).json({ "message": 'Usuario creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Error al crear usuario" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                active: true
            }
        });
        const admins = await Admin.findAll({
            where: {
                active: true
            }
        });
        const listUsers = [];
        // Iteramos sobre la lista original de administradores
        let adminList = [];
        admins.forEach(admin => {
            // Creamos un nuevo objeto JSON con solo las propiedades requeridas
            const adminJson = {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                permission: 'admin'
            };
            // Agregamos el nuevo objeto JSON a la nueva lista
            adminList.push(adminJson);
        });

        let userList = [];
        users.forEach(user => {
            // Creamos un nuevo objeto JSON con solo las propiedades requeridas
            const userJson = {
                id: user.id,
                username: user.username,
                email: user.email,
                permission: 'user'
            };
            // Agregamos el nuevo objeto JSON a la nueva lista
            userList.push(userJson);
        });

        listUsers.push(adminList);
        listUsers.push(userList);

        res.json(listUsers);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

function validarUsuario(usuario) {
    // Verificar que ningún campo sea nulo
    if (!usuario.username || !usuario.email || !usuario.password || !usuario.permissions) {
        return false; // Al menos uno de los campos es nulo
    }

    // Verificar que permissions contenga solo "user" o "admin"
    if (usuario.permissions !== "user" && usuario.permissions !== "admin") {
        return false; // El valor de permissions no es válido
    }

    return true; // Todos los campos son válidos
}