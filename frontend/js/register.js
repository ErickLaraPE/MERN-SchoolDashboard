
import clienteAxios from "../config/clienteAxios.js";
import {roles,setRoles} from "./globalVariables.js";
import { checkAuthorization } from "./auth.js";

const btnRegister = document.querySelector('#btnRegister');
const InputName = document.querySelector('#name');
const InputEmail = document.querySelector('#email');
const InputUsername = document.querySelector('#username');
const InputPassword = document.querySelector('#password');
const InputConfirmPassword = document.querySelector('#confirmpassword');
const InputRol = document.querySelector('#opciones');
const alerta = document.querySelector('#alerta');

await checkAuthorization();

async function cargarRoles() {
    try {
            const {data} = await clienteAxios('/roles/');
            setRoles(data);
            const optionInit = document.createElement('option');
            optionInit.classList.add('option');
            optionInit.innerHTML = 'Seleccione un rol';
            InputRol.append(optionInit);
            roles.forEach((rol) => {
                const option = document.createElement('option');
                option.classList.add('option');
                option.innerHTML = rol.rol;
                InputRol.append(option);
            })
        } catch (error) {
            console.log(error);
        }
}

function getIDfromRol(rolSelected) {
    
    const temp = roles.find(rol => rol.rol === rolSelected);
    if(!temp) {
        return;
    }
    return temp.ID_Rol;
}

cargarRoles()

async function registrarse(name,username,email,password,confirmPassword,ID_Rol) {
    try {
            const {data} = await clienteAxios.post('/usuarios/',{name,username,email,password,confirmPassword,ID_Rol});
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
                },3000)
                return
            }
            alerta.classList.add('active');
            alerta.classList.add('success');
            const p = document.createElement('p');
            p.innerHTML = data.msg;
            alerta.append(p);
            setTimeout(() => {
                alerta.classList.remove('active');
                alerta.classList.remove('success');
                alerta.classList.add('alerta');
                p.innerHTML = '';
                window.location.href = './login.html';
            },3000)
        } catch(error){
            console.log(error)
        }
}

btnRegister.addEventListener('click',() => {
    console.log('Click en registrar')
    const valName = InputName.value;
    const valUsername = InputUsername.value;
    const valEmail = InputEmail.value;
    const valPassword = InputPassword.value;
    const valConfirmPassword = InputConfirmPassword.value;
    const valID_Rol = getIDfromRol(InputRol.value);
    registrarse(valName,valUsername,valEmail,valPassword,valConfirmPassword,valID_Rol);
})

