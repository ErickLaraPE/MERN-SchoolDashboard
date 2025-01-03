import express from 'express'
import {getInscripcionByIdUser} from '../controllers/inscripcionController.js'

const router = express.Router()

router
    .route("/getInscripciones/:id")
    .get(getInscripcionByIdUser) // obtener inscripciones

export default router