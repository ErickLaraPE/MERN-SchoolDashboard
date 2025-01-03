import clienteAxios from "../config/clienteAxios.js";
import { setUsuario } from "./globalVariables.js";
import { checkAuthorization } from "./auth.js";
const btnLogin = document.querySelector('#btnLogin');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const alerta = document.querySelector('#alerta');

await checkAuthorization();

async function loguearse(username,password) {
    try {
            const {data} = await clienteAxios.post('/usuarios/login',{username,password});
            if(data.error){
                alerta.classList.add('active');
                alerta.classList.add('error');
                const p = document.createElement('p');
                p.innerHTML = data.msg;
                alerta.append(p);
                setTimeout(() => {
                    alerta.classList.remove('active');
                    alerta.classList.remove('error');
                    p.innerHTML='';
                },3000);
                return
            }
            //setUsuario(data);
            localStorage.setItem('token', data.token);
            alerta.classList.add('active');
            alerta.classList.add('success');
            const p = document.createElement('p');
            p.innerHTML = 'Inicio de sesion exitoso';
            alerta.append(p);
            setTimeout(() => {
                alerta.classList.remove('active');
                alerta.classList.remove('success');
                p.innerHTML='';
                window.location.href = './index.html';
            },3000);
        } catch (error) {
            console.log(error);
        }
}

btnLogin.addEventListener('click',() => {
    const valUsername = username.value;
    const valPassword = password.value;
    loguearse(valUsername,valPassword);
})

