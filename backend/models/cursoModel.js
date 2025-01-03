import db from "../config/db.js";
import { DataTypes } from "sequelize";

const CursoModel = db.define('cursos',{
    ID_Curso: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    curso: { type: DataTypes.STRING},
}, {
    timestamps: false // Esto desactiva las columnas createdAt y updatedAt
});

export default CursoModel