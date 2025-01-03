import express from 'express'
import {login,register,actualizaPerfil,perfil} from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();

router
    .route("/")
    .post(register) //registrarse

router
    .route("/login")
    .post(login) // loguearse

router
    .get('/perfil',checkAuth,perfil)

router
    .route('/actualizaDatos/:id')
    .put(checkAuth,actualizaPerfil)

export default router;