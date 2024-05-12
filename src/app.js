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
import supplierRouters from "./routes/supplierRoutes.js";
import categorieRouters from "./routes/categoriesRoutes.js";
import articlesRouters from "./routes/articlesRoutes.js";
import storeRouters from "./routes/storeRoutes.js";
import locationRouters from "./routes/locationRoutes.js";
import stockRouters from "./routes/stockRoutes.js";
import stockStoreRouters from "./routes/stockStoreRoutes.js";
import stateRouters from "./routes/stateRoutes.js";

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
app.use(cors());
//app.use(morgan("dev"));
app.use(express.json());
app.use(authMiddleware);

//Routes
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/admin", adminRouters);
app.use("/api/v1/user", userRouters);
app.use("/api/v1/countries", countriesRouters);
app.use("/api/v1/suppliers", supplierRouters);
app.use("/api/v1/categories", categorieRouters);
app.use("/api/v1/articles", articlesRouters);
app.use("/api/v1/stores", storeRouters);
app.use("/api/v1/locations", locationRouters);
app.use("/api/v1/stock", stockRouters);
app.use("/api/v1/stock-store", stockStoreRouters);
app.use('/api/v1/state', stateRouters);
