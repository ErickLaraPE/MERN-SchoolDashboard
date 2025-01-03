
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* Funcion generarJWTAccess se emplea para generar un token de inicio de sesion al momento de loguearse */

const generarJWTAccess = (id) => {
    // Se genera el jsonwebtoken a partid del ID del usuario tras haber iniciado sesion
    const payload = {
        id,
        randomValue: Math.random().toString(36).substring(2, 15), // Genera un valor aleatorio
    };
    
    return jwt.sign(payload,process.env.JWT_SECRET_ACCESS,{
        expiresIn:"20m",
    })
}

export default generarJWTAccess