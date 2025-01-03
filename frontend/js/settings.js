import clienteAxios from "../config/clienteAxios.js";
import { loadUsuario } from "./auth.js";
import { usuario,roles,setRoles } from "./globalVariables.js";

const InputUsername = document.querySelector('#usuario');
const InputEmail = document.querySelector('#correo');
const InputRol = document.querySelector('#opciones');
const btnGuardar = document.querySelector('#btn-guardar');
const alerta = document.querySelector('#alerta');

await loadUsuario();

async function cargarRoles() {
    try {
            const {data} = await clienteAxios('/roles/');
            setRoles(data);
        } catch(error){
            console.log(error);
        }
}

await cargarRoles();

function getRolbyID(ID){
    const temp = roles.find(rol => rol.ID_Rol === ID)
    if(!temp){
        return
    }
    return temp.rol;
}

function cargarPerfil(){
    
    InputUsername.value = usuario.username;
    InputEmail.value = usuario.email;
    roles.forEach((rol) => {
        const option = document.createElement('option');
        option.classList.add('option');
        option.innerHTML = rol.rol;
        InputRol.append(option);
    })
    InputRol.value = getRolbyID(usuario.ID_Rol);
}

cargarPerfil();

function getIDRol(Inputrol){
    const temp = roles.find(rol => rol.rol === Inputrol);
    if(!temp){
        return;
    }
    return temp.ID_Rol;
}

async function actualizaDatos(id){
    try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}`}
            };
            const username = InputUsername.value;
            const email = InputEmail.value;
            const rol = InputRol.value;
            const ID_Rol = getIDRol(rol);
            const {data} = await clienteAxios.put(`/usuarios/actualizaDatos/${id}`,{username:username,email:email,ID_Rol:ID_Rol},config);
            if(data.error){
                alerta.classList.add('active');
                alerta.classList.add('error');
                const p = document.createElement('p');
                p.innerHTML = data.msg;
                alerta.append(p);
                setTimeout(() => {
                    alerta.classList.remove('active');
                    alerta.classList.remove('error');
                    p.innerHTML = '';
                },3000);
                return;
            }
            alerta.classList.add('active');
            alerta.classList.add('success');
            const p = document.createElement('p');
            p.innerHTML = data.msg;
            alerta.append(p);
            setTimeout(() => {
                alerta.classList.remove('active');
                alerta.classList.remove('success');
                p.innerHTML = '';
            },3000);
        } catch (error) {
            console.log(error);
        }
}

btnGuardar.addEventListener('click',() => {
    actualizaDatos(usuario.ID_Usuario)
});