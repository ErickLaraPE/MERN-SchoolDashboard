import db from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import RolModel from "./rolModel.js";

const UsuarioModel = db.define('usuarios',{
    ID_Usuario: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name: { 
        type: DataTypes.STRING
    },
    username: { 
        type: DataTypes.STRING
    },
    password: { 
        type: DataTypes.STRING
    },
    email: { 
        type: DataTypes.STRING
    },
    token: {
        type:DataTypes.STRING
    },
    ID_Rol: { 
        type: DataTypes.INTEGER,
        references:{
            model: RolModel,
            key:'ID_Rol'
        }
    }
}, {
    timestamps: true, // Habilita timestamps
    hooks: {
            beforeSave: async (usuario) => {
                if (!usuario.changed('password')) {
                    return;
                }
                const salt = await bcrypt.genSalt(10); // hash para encriptar
                usuario.password = await bcrypt.hash(usuario.password, salt); // password hasheado y encriptado
                console.log(usuario.password)
            }
    }
});

UsuarioModel.prototype.comprobarPassword = async function(passwordFormulario){
        return await bcrypt.compare(passwordFormulario,this.password);
}

export default UsuarioModel

