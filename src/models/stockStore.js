import { DataTypes } from "sequelize";
import db from "../database/database.js";

const StockStore = db.define('stockStore', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(255)
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default StockStore;