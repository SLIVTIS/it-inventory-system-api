import { DataTypes } from "sequelize";
import db from "../database/database.js";

const PermissionStore = db.define('permissionStore', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true,
});

export default PermissionStore;