import { DataTypes } from "sequelize";
import db from "../database/database.js";

const Store = db.define('store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(250),
    },
    isHostelery: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Store;