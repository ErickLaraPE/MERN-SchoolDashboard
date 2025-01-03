
import CursoModel from "../models/cursoModel.js";

const getCursos = async (req,res) => {
    try {
            const cursos = await CursoModel.findAll();
            if(!cursos){
                return
            }
            return res.json(cursos);
        } catch (error) {
            console.log(error);
        }
}

export {getCursos}