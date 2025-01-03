import express from 'express'
import {getCursos} from '../controllers/cursoController.js'

const router = express.Router()

router
    .route("/getCursos")
    .get(getCursos) // obtener cursos

export default router