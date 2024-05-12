import { DataTypes } from "sequelize";
import db from "../database/database.js";

const PermissionLocation = db.define('permissionLocation', {
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

export default PermissionLocation;