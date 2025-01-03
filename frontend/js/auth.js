import { setUsuario} from "./globalVariables.js";
import clienteAxios from "../config/clienteAxios.js";

const loadUsuario = async () => {
    try {
            const token = localStorage.getItem('token');
            if(!token){
                window.location.href='./login.html';
                return
            }
            const config = {
                headers: { Authorization:`Bearer ${token}` }
            }
            const {data} = await clienteAxios('/usuarios/perfil',config);
            setUsuario(data);
        } catch (error) {
            console.log(error);
        }
} 

const checkAuthorization = async () => {
    try{
            const token = localStorage.getItem('token');
            if(token){
                window.location.href='index.html';
            }
        } catch (error) {
            console.log(error);
        }
}

export {
        loadUsuario,checkAuthorization
}