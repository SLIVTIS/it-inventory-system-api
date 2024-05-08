import { DataTypes } from "sequelize";
import db from "../database/database.js";

const StockMovements = db.define('stockMovements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default StockMovements;