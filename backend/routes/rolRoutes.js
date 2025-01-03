import express from 'express'
import {getRoles} from '../controllers/rolController.js'

const router = express.Router()

router
    .route("/")
    .get(getRoles) // obtener roles

export default router


