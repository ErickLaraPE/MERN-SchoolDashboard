import clienteAxios from "../config/clienteAxios.js";
import { usuario } from "./globalVariables.js";
import { loadUsuario } from "./auth.js";

const contenedorTareas = document.querySelector('#tareas');
const botonBuscar = document.querySelector('.btn-buscar');
const botonAgregar = document.querySelector('.btn-agregar');
const InputTaskname = document.querySelector('.input-tarea');
const InputType = document.querySelector('.input-type');
const alerta = document.querySelector('#alerta');

let tasks;

await loadUsuario();

async function getTasks(id) {
    try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}` }
            };
            const {data} = await clienteAxios(`/tasks/getTasks/${id}`,config);
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
                return
            }
            tasks = data;
        } catch (error) {
            console.log(error);
        }
}

await getTasks(usuario.ID_Usuario);

function mostrarActiva(std){
    if(std === 1){
        return 'ACTIVA'
    } else {
        return 'INACTIVA'
    }
}
function mostrarTareas(){
    contenedorTareas.innerHTML = '';
    tasks.forEach((task) => {
        const div = document.createElement('div');
        div.classList.add('tarea');
        div.innerHTML=`
                <p class='input-name activo' id="name-${task.ID_Task}"> ${task.taskname} </p>
                <input class='input-task' type="text" id="input-${task.ID_Task}" />
                <p class='task-type'> ${task.type} </p> 
                <p> ${task.date} </p>
                <p class='task-activo'> ${mostrarActiva(task.activo)} </p>
                <button class='btn-editar activo' id="editar-${task.ID_Task}" type="button"> Editar </button>
                <button class='btn-update' id="update-${task.ID_Task}" type="button"> Update </button>
                <button class='btn-desactivar activo' id="desactivar-${task.ID_Task}" type="button"> Desactivar </button>
                <button class='btn-cancel' id="cancel-${task.ID_Task}" type="button"> Cancel </button>            
        `;
        contenedorTareas.append(div);
        botonesTask();
        console.log(task.taskname,task.date);
    });
}
mostrarTareas();

async function agregarTask(taskname,type,ID) {
    try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}` }
            };
            const {data} = await clienteAxios.post('/tasks/agregarTask',{taskname:taskname,type:type,ID_Usuario:ID},config);
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
            await getTasks(usuario.ID_Usuario);
            mostrarTareas();
            alerta.classList.add('active');
            alerta.classList.add('success');
            const p = document.createElement('p');
            p.innerHTML = 'Se agrego una tarea exitosamente';
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

async function buscarTask(taskname,type) {
    try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}` }
            };
            const {data} = await clienteAxios.post('/tasks/buscarTasks',{taskname:taskname,type:type},config);
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
            tasks = data;
            mostrarTareas();
        } catch (error) {
            console.log(error);
        }
}
botonBuscar.addEventListener('click',() => {
    const ValtaskName = InputTaskname.value;
    const Valtype = InputType.value;
    buscarTask(ValtaskName,Valtype);
})

botonAgregar.addEventListener('click',() => {
    const ValtaskName = InputTaskname.value;
    const Valtype = InputType.value;
    agregarTask(ValtaskName,Valtype,usuario.ID_Usuario);
})

function editarTarea(e) {
        const idBoton = e.currentTarget.id;
        const id = idBoton.split('-')[1];
        const tskName = document.querySelector(`#name-${id}`);
        tskName.classList.remove('activo');
        const inputTsk = document.querySelector(`#input-${id}`);
        inputTsk.classList.add('activo');
        const btnEdit = document.querySelector(`#editar-${id}`);
        btnEdit.classList.remove('activo');
        const btnUpdate = document.querySelector(`#update-${id}`);
        btnUpdate.classList.add('activo');
        const btnDesactivar = document.querySelector(`#desactivar-${id}`);
        btnDesactivar.classList.remove('activo');
        const btnCancel = document.querySelector(`#cancel-${id}`);
        btnCancel.classList.add('activo');
}

async function desactivarTarea(e) {
    try {
            const idBoton = e.currentTarget.id;
            const id = idBoton.split('-')[1];
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}`}
            };
            const {data} = await clienteAxios.put(`/tasks/desactivarTask/${id}`,{activo:0},config);
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
            },3000)
        } catch (error) {
            console.log(error);
        }
}

async function actualizarTarea(e) {
    try {
            const idBoton = e.currentTarget.id;
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization:`Bearer ${token}`}
            };
            const id = idBoton.split('-')[1];
            const inputTsk = document.querySelector(`#input-${id}`);
            console.log(inputTsk.value);
            const {data} = await clienteAxios.put(`/tasks/actualizarTask/${id}`,{taskname:inputTsk.value},config);
            if(data.error){
                console.log(data);
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
                return;
            }
            await getTasks(usuario.ID_Usuario);
            mostrarTareas()
            alerta.classList.add('activo');
            alerta.classList.add('success');
            const p = document.createElement('p');
            p.innerHTML = 'Se actualizo la tarea exitosamente';
            alerta.append(p);
            const tskName = document.querySelector(`#name-${id}`);
            tskName.classList.add('activo');
            inputTsk.classList.remove('activo');
            const btnEdit = document.querySelector(`#editar-${id}`);
            btnEdit.classList.add('activo');
            const btnUpdate = document.querySelector(`#update-${id}`);
            btnUpdate.classList.remove('activo');
            const btnDesactivar = document.querySelector(`#desactivar-${id}`);
            btnDesactivar.classList.add('activo');
            const btnCancel = document.querySelector(`#cancel-${id}`);
            btnCancel.classList.remove('activo');
            setTimeout(() => {
                alerta.classList.remove('activo');
                alerta.classList.remove('success');
                p.innerHTML = '';
            },3000)
        } catch (error) {
            console.log(error);
        }
}

function cancelarTarea(e) {
    const idBoton = e.currentTarget.id;
    const id = idBoton.split('-')[1];
    const tskName = document.querySelector(`#name-${id}`);
    tskName.classList.add('activo');
    const inputTsk = document.querySelector(`#input-${id}`);
    inputTsk.classList.remove('activo');
    const btnEdit = document.querySelector(`#editar-${id}`);
    btnEdit.classList.add('activo');
    const btnUpdate = document.querySelector(`#update-${id}`);
    btnUpdate.classList.remove('activo');
    const btnDesactivar = document.querySelector(`#desactivar-${id}`);
    btnDesactivar.classList.add('activo');
    const btnCancel = document.querySelector(`#cancel-${id}`);
    btnCancel.classList.remove('activo');
}

function botonesTask() {
    const botonesEditar = document.querySelectorAll('.btn-editar');
    const botonesUpdate = document.querySelectorAll('.btn-update');
    const botonesDesactivar = document.querySelectorAll('.btn-desactivar');
    const botonesCancel = document.querySelectorAll('.btn-cancel');

    botonesEditar.forEach((boton) => {
        boton.addEventListener('click',editarTarea);
    })
    botonesUpdate.forEach((boton) => {
        boton.addEventListener('click',actualizarTarea);
    })
    botonesDesactivar.forEach((boton) => {
        boton.addEventListener('click',desactivarTarea);
    })
    botonesCancel.forEach((boton) => {
        boton.addEventListener('click',cancelarTarea);
    })
}   

botonesTask()




