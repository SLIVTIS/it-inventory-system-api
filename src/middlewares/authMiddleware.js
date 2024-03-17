import config from "../config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authorization = req.get("authorization");
    let token = null;

    // Excluye la ruta de login del middleware de autenticación
    if (req.path === '/api/v1/login') {
        return next();
    }

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    if (token !== null) {
        try {
            const decodeToken = jwt.verify(token, config.spassword);
            if (!decodeToken.id) {
                return res.status(401).json({ error: 'Token missing or invalid ' });
            }
            next();
        } catch (error) {
            console.error("Error::Token:", error);
            return res.status(401).json({ error: 'Token missing or invalid ' });
        }

    } else {
        return res.status(401).json({ error: 'Token missing or invalid ' });
    }
};


export default authMiddleware;