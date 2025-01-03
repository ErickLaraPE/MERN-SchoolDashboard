
import InscripcionModel from "../models/inscripcionModel.js"

const getInscripcionByIdUser = async (req,res) => {

    const {id} = req.params;

    const inscripciones = await InscripcionModel.findAll({where:{ID_Usuario:id}});
    if(inscripciones.length === 0){
        return res.json([]);
    }
    return res.json(inscripciones);
}

export {
    getInscripcionByIdUser
}