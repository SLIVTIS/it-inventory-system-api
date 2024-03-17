import Sequelize from "sequelize";
import config from "./../config.js";

const db = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: "mysql",
});

export default db;