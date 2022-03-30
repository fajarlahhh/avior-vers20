import { Sequelize } from "sequelize";
import { db } from "../config/db";

const { DataTypes } = Sequelize;

const Package = db.define('accounts', {
    unique: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
})

export default Package;