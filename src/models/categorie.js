import { DataTypes } from "sequelize";
import db from "../database/database.js";

const Categorie = db.define('categorie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default Categorie;