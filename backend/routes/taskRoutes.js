import express from 'express'
import {getTasksById,updateTaskName,desactivarTask,buscarTask,agregarTask} from '../controllers/taskController.js'
import checkAuth from '../middleware/checkAuth.js'
const router = express.Router()

router
    .route('/getTasks/:id')
    .get(checkAuth,getTasksById) // Obtener tasks por id

router
    .route('/actualizarTask/:id')
    .put(checkAuth,updateTaskName) // Actualizar el taskname

router
    .route('/desactivarTask/:id')
    .put(checkAuth,desactivarTask) // Desactivar el task

router
    .route('/buscarTasks')
    .post(checkAuth,buscarTask)

router
    .route('/agregarTask')
    .post(checkAuth,agregarTask)

export default router