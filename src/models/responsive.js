import { DataTypes } from "sequelize";
import db from "../database/database.js";

const Responsive = db.define('responsive', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(250)
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Responsive;