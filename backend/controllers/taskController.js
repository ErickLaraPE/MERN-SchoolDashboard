import taskModel from "../models/taskModel.js";

const buscarTask = async (req,res) => {

    const {taskname,type} = req.body;

    try {
            const condiciones = {};
        
            if(taskname){
                condiciones.taskname = {[Op.like]:`%${taskname}%`};
            } else if(type){
                condiciones.type = type;
            }
            if(Object.keys(condiciones).length === 0){
                return res.json({msg:'No se completaron los criterios de busqueda',error:true});
            }
            const tasks = await taskModel.findAll({attributes: ['ID_Task','taskname','type','date'],where: condiciones})
            if(tasks.length === 0){
                return res.json({msg:'No se encontraron tareas',error:true})
            }
            console.log(tasks)
            return res.json(tasks)
        } catch (error) {
            return res.json({msg:'Error al buscar tasks',error:true})
        }
}

const agregarTask = async (req,res) => {

    const {taskname,type} = req.body;
    /*
        taskname: 'Leer habitos atomicos'
        type: 'academica'
        ID_Usuario: 3
    */
    try {
            if(taskname === '' && type === ''){
                return res.json({msg:'No has agregado los datos para crear la tarea',error:true});
            } 
            if(taskname === ''){
                return res.json({msg:'No has agregado el taskname',error:true});
            }
            if(type === ''){
                return res.json({msg:'No has ingresado el type',error:true});
            }
            const newTask = taskModel.build(req.body);
            await newTask.save();
            // SE DEBE DEVOLVER SIEMPRE YA SEA UN MENSAJE DE EXITO O CONFIRMACION O EL NUEVO OBJETO U OBJETO ACTUALIZADO
            // (CASOS DE OPERACIONES CREATE Y UPDATE) PORQUE SINO SE PUEDE COMPORTAR EL PROGRAMA DE FORMA INESPERADA (SOLO SE VERA EL NUEVO OBJETO O EL OBJETO ACTUALIZADO AL RECARGAR LA PAGINA)
            return res.json({msg:'Se agrego el nuevo task',error:false}); 
        } catch (error) {
            return res.json({msg:'Error al agregar task',error:true})
        }
}

const getTasksById = async (req,res) => {
    try {
            const {id} = req.params;
            const tasks = await taskModel.findAll({where:{ID_Usuario:id}});
            if(!tasks){
                return res.json({msg:'No hay tareas encontradas',error:true});
            }
            return res.json(tasks);
        } catch (error) {
            return res.json({msg:'Error al obtener tasks',error:true}) 
        }
}

const updateTaskName = async (req,res) => {
    try {
            const {taskname} = req.body;
            const {id} = req.params;
            const taskFound = await taskModel.findOne({where:{ID_Task:id}});
            if(!taskFound){
                return res.json({msg:'No se encontro la tarea a modificar',error:true});
            }
            if(taskFound.activo === false){
                return res.json({msg:'No se puede cambiar el taskname de una tarea desactivada',error:true})
            }
            if(taskname === ''){
                return res.json({msg:'La tarea no puede tener un nombre en blanco',error:true})
            }
            const taskActual = await taskModel.update({taskname:taskname},{where:{ID_Task:id}});
            console.log(taskActual);
            return res.json(taskActual);
        } catch (error) {
            console.log(error);
            return res.json({msg:'Error al actualizar el taskname',error:true})
        }
}

const desactivarTask = async (req,res) => {
    try {
            const {id} = req.params;
            const taskFound = await taskModel.findOne({where:{ID_Task:id}});
            if(!taskFound){
                return res.json({msg:'No se encontro la tarea a desactivar',error:true});
            }
            if(taskFound.activo === false){
                return res.json({msg:'No se puede desactivar una tarea ya desactivada',error:true});
            } 
            await taskModel.update({activo:0},{where:{ID_Task:id}});
            return res.json({msg:'Se ha desactivado la tarea exitosamente',error:false});
        } catch (error) {
            return res.json({msg:'Error al desactivar el task',error:true});
        }
}

export {
    getTasksById,updateTaskName,desactivarTask,buscarTask,agregarTask
}