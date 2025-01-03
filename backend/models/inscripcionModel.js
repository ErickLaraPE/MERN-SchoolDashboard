import db from "../config/db.js";
import { DataTypes } from "sequelize";
import UsuarioModel from "./usuarioModel.js";
import CursoModel from "./cursoModel.js";

const InscripcionModel = db.define('inscripciones',{
    ID_Inscripcion: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ID_Usuario: { 
        type: DataTypes.INTEGER,
        references:{
            model: UsuarioModel,
            key:'ID_Usuario'
        }
    },
    ID_Curso: { 
        type: DataTypes.INTEGER,
        references:{
            model: CursoModel,
            key:'ID_Curso'
        }
    },
    Nota: { 
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false // Esto desactiva las columnas createdAt y updatedAt
});

export default InscripcionModel

