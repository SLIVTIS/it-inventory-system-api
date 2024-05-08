import Sequelize, { DataTypes } from "sequelize";
import db from "../database/database.js";

const StateMovement = db.define('stateMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('pendiente', 'aceptada', 'rechazada'),
        allowNull: false,
        defaultValue: 'pendiente',
    },
    comment: {
        type: DataTypes.STRING(255)
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default StateMovement;