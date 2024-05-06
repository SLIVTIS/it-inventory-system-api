import { DataTypes } from "sequelize";
import db from "../database/database.js";
import Supplier from "./supplier.js";
import Categorie from "./categorie.js";

const Article = db.define('article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categorieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modelname: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    description: {
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

export default Article;