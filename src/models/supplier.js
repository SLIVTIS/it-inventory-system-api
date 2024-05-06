import { DataTypes } from "sequelize";
import db from "../database/database.js";
import Article from "./article.js";

const Supplier = db.define('supplier', {
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
        type: DataTypes.STRING(250),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
    },
    telephone: {
        type: DataTypes.STRING(250),
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

export default Supplier;