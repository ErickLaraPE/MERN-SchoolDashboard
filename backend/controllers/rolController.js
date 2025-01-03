import RolModel from "../models/rolModel.js"

const getRoles = async (req,res) => {
    try {
            const roles = await RolModel.findAll();
            return res.json(roles);
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al obtener roles',error:true})
        }
}

export {
    getRoles
}