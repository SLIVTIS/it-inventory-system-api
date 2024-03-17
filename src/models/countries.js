import { DataTypes, Model } from "sequelize";
import db from "../database/database.js";

const Countries = db.define('Countries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(80),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Countries;