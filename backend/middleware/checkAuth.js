import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuarioModel.js';
import dotenv from 'dotenv';

dotenv.config();

const checkAuth = async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_ACCESS);
            req.usuario = await UsuarioModel.findOne({where:{ID_Usuario:decoded.id},attributes:{ exclude:["password","token","createdAt","updatedAt"]}});
            if(!req.usuario){
                return res.json({ msg: 'Usuario no encontrado', error: true });
            }
            console.log(req.usuario);
            return next();
        } catch (error) {
            console.log(error);
        }
    }
    if(!token) {
        return res.json({ msg: 'Token no proporcionado',error:true });
    }
} 

export default checkAuth;







