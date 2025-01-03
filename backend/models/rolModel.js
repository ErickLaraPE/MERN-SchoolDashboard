import db from '../config/db.js'
import { DataTypes } from "sequelize";

const RolModel = db.define('roles',{
    ID_Rol:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rol:{type: DataTypes.STRING},
}, {
    timestamps: false // Esto desactiva las columnas createdAt y updatedAt
})

export default RolModel
