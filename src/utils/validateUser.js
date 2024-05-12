import config from "../config.js";
import jwt from "jsonwebtoken";

//----------------------------------
export function validateUser(authorization) {

    let token = null;

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    if (token !== null) {
        try {
            const decodeToken = jwt.verify(token, config.spassword);
            if (!decodeToken.id) {
                return 'Token missing or invalid';
            }
            return decodeToken;
        } catch (error) {
            console.error("Error::Token:", error);
            return 'Token missing or invalid';
        }

    } else {
        return 'Token missing or invalid';
    }
};