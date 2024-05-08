import { DataTypes } from "sequelize";
import db from "../database/database.js";

const Stock = db.define('stock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    serie: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(255)
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default Stock;