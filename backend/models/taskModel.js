import db from "../config/db.js";
import { DataTypes } from "sequelize";
import UsuarioModel from "./usuarioModel.js";

const taskModel = db.define('tasks',{
    ID_Task: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    taskname: { type: DataTypes.STRING},
    type: { type: DataTypes.STRING},
    date: { type:DataTypes.DATEONLY},
    ID_Usuario: { 
        type: DataTypes.INTEGER,
        references:{
            model: UsuarioModel,
            key:'ID_Usuario'
        }
    },
    activo: {
        type:DataTypes.TINYINT
    },
    CreatedAt: {
        type: DataTypes.DATEONLY, // Almacena solo la fecha
        defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
        type: DataTypes.DATEONLY, // Almacena solo la fecha
        defaultValue: DataTypes.NOW,
    },
},{
    timestamps: true, // Habilita timestamps
    createdAt: 'CreatedAt', // Define el nombre del campo de creación
    updatedAt: 'UpdatedAt', // Define el nombre del campo de actualización
});

export default taskModel