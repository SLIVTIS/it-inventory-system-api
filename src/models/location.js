import { DataTypes } from "sequelize";
import db from "../database/database.js";

const Location = db.define('location', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Location;