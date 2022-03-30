import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Package = db.define('packages', {
    name: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.INTEGER
    }
},{
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    freezeTableName: true
});

export default Package