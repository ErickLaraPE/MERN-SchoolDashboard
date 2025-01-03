import UsuarioModel from "../models/usuarioModel.js";
import generarJWTAccess from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";

const login = async (req,res) => {
    try {
            const {username,password} = req.body;
            const regex1 = /^[a-zA-Z0-9]*$/
            const regex2 =  /^[a-zA-Z0-9 %&$]*$/
            //Validar inputs de texto
            if(!regex1.test(username)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el username',error:true})
            }
            if(!regex2.test(password)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el password',error:true})
            }
            if(username === '' && password === ''){
                return res.json({msg:'Debes ingresar todos los campos',error:true})
            }
            if(username === ''){
                return res.json({msg:'Debes ingresar el username',error:true})
            }
            if(password === ''){
                return res.json({msg:'Debes ingresar el password',error:true})
            }
            const user = await UsuarioModel.findOne({where:{ username:username}})
            if(!user){
                return res.json({msg: 'El usuario no existe o has ingresado el password incorrecto',error:true});
            }
            // Comprobar su password
            // VERIFICAR QUE LA CANTIDAD DE CARACTERES DEL PASSWORD EN SU CAMPO DE LA TABLA DE LA BD DEBE SER MINIMO DE 60 CARACTERES
            if(await user.comprobarPassword(password)){ 
                const token = generarJWTAccess(user.ID_Usuario);
                await user.save();
                return res.json({
                    ID_Usuario: user.ID_Usuario,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    token: token,
                    ID_Rol: user.ID_Rol,
                })
            } else {
                console.log('Error');
                return res.json({ msg:'Has ingresado el password incorrecto',error:true})
            }
        } catch (error) {
            return res.json({msg: 'Error al iniciar sesion',error:true});
        }
}

const register = async (req,res) => {
    try {
            const {name,username,email,password,confirmPassword,ID_Rol} = req.body;
            const regex1 = /^[a-z A-Z]*$/;
            const regex2 = /^[a-zA-Z0-9]*$/;
            const regex3 =  /^[a-zA-Z0-9@%&$.]*$/;
            //Validar inputs de texto
            if(!regex1.test(name)){
                return res.json({msg:'Solo se permite ingresar letras en el nombre',error:true});
            }
            if(!regex2.test(username)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el username',error:true});
            }
            if(!regex3.test(email)){
                return res.json({msg:'Solo se permite ingresar letras,numeros y ciertos caracteres especiales en el correo',error:true});
            }
            if(!regex3.test(password)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el password',error:true});
            }
            if(username === '' && password === '' && name ==='' && email==='' && confirmPassword===''&& ID_Rol ===''){
                return res.json({msg:'Debes ingresar todos los campos',error:true});
            }
            if(name === ''){
                return res.json({msg:'Debes ingresar el name',error:true});
            }
            if(username === ''){
                return res.json({msg:'Debes ingresar el username',error:true});
            }
            if(email === ''){
                return res.json({msg:'Debes ingresar un correo electronico',error:true});
            }
            if(password === ''){
                return res.json({msg:'Debes ingresar el password',error:true});
            }
            if (confirmPassword === ''){
                return res.json({msg:'Debes confirmar el password',error:true});
            }
            if(password !== confirmPassword){
                return res.json({msg:'Los passwords deben coincidir',error:true});
            }
            if(ID_Rol === ''){
                return res.json({msg:'Debes ingresar el Rol',error:true});
            }
            const usuario = UsuarioModel.build({name,username,password,email,ID_Rol});
            usuario.token = generarID();
            await usuario.save()
            return res.json({msg:"Usuario Creado Correctamente",error:false}); 
        } catch(error){
            console.log(error);
            return res.json({msg:'Error al registrar usuario',error:true});
        }
}

const perfil = (req,res) => {
    try {
            const {usuario} = req
            return res.json(usuario)
        } catch (error) {
            console.log(error);
            return res.json({msg:'Error al obtener perfil',error:true});
        }
}

const actualizaPerfil = async (req,res) => {
    const {id} = req.params;
    const {username,email,ID_Rol} = req.body;
    try {
            const userFound = await UsuarioModel.findOne({where:{ID_Usuario:id}});
            if(!userFound){
                return res.json({msg:'No se encontro usuario',error:true});
            }
            await UsuarioModel.update({username:username,email:email,ID_Rol:ID_Rol},{where:{ID_Usuario:id}});
            return res.json({msg:'Se actualizo al usuario exitosamente',error:false});
        } catch (error){
            return res.json({msg:'Error al actualizar perfil',error:true});
        }
}

export {
    login,register,perfil,actualizaPerfil
}

