import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./database/database.js";
import config from "./config.js";

//Router import
import loginRouter from "./routes/loginRoutes.js";
import userRouters from "./routes/userRoutes.js";
import countriesRouters from "./routes/countriesRoutes.js";
import adminRouters from "./routes/adminRoutes.js";

//Middleware
import authMiddleware from "./middlewares/authMiddleware.js";

export const app = express();

//DB test conectión 
(async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.log("Error al conectar a la base de datos");
        console.log(error.message);
    }
})()

//settings
app.set("port", config.port);

//Middleware
app.use(cors()); //Temporal
app.use(morgan("dev"));
app.use(express.json());
app.use(authMiddleware);

//Routes
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/admin", adminRouters);
app.use("/api/v1/user", userRouters);
app.use("/api/v1/countries", countriesRouters);