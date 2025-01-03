import clienteAxios from "../config/clienteAxios.js";
import { loadUsuario } from "./auth.js";
import { usuario,roles,setRoles,inscripciones,setInscripciones,cursos,setCursos } from "./globalVariables.js";

const contenedorUsuario = document.querySelector('#usuario');
const contenedorCursos = document.querySelector('#cursos');
const contenedorNotas = document.querySelector('#notas');

await loadUsuario();

async function cargarCursos(){
    try {
            const {data} = await clienteAxios('/cursos/getCursos');
            setCursos(data);
        } catch (error) {
            console.log(error);
        }
}

await cargarCursos();

async function cargarRoles() {
    try {
            const {data} = await clienteAxios('/roles/');
            setRoles(data);
        } catch(error) {
            console.log(error);
        }
}

async function cargarInscripciones(id) {
    try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}` }
            }
            const {data} = await clienteAxios(`/inscripciones/getInscripciones/${id}`,config);
            setInscripciones(data);
        } catch (error) {
            console.log(error);
        }
}

function getCurso(id) {
    const temp = cursos.find(curso => curso.ID_Curso === id);
    return temp.curso;
}


function getRol(id) {
    const temp = roles.find(rol => rol.ID_Rol === id);
    return temp.rol;
}

async function inicio() {
    await cargarRoles();
    const divUsuario = document.createElement('div');
    divUsuario.classList.add('usuario-detalles');
    divUsuario.innerHTML = `
        <h4>${usuario.name}</h4>
        <p>${getRol(usuario.ID_Rol)}</p>
    `;
    contenedorUsuario.append(divUsuario);
    await cargarInscripciones(usuario.ID_Usuario);
    console.log(inscripciones);               
    inscripciones.forEach(inscripcion => {
        const divCursos = document.createElement('div');
        divCursos.classList.add('cursos-matriculados');
        divCursos.innerHTML = `
            <h4>${getCurso(inscripcion.ID_Curso)}</h4>
        `;
        contenedorCursos.append(divCursos);

        const divNotas = document.createElement('div');
        divNotas.classList.add('notas-finales');
        divNotas.innerHTML = `
            <h4>${inscripcion.Nota}</h4>
        `;
        contenedorNotas.append(divNotas);
    })
}

inicio();

