export let usuario = {};
export let roles = [];
export let inscripciones = [];
export let cursos = [];

export function setUsuario(NewUsuario) {
    usuario = NewUsuario; // Función para cambiar el valor de usuario
}

export function setRoles(NuevoRoles){
    roles = NuevoRoles; // Función para cambiar el valor de los roles
}

export function setCursos(NuevoCursos){
    cursos = NuevoCursos; // Función para cambiar el valor de los cursos
}

export function setInscripciones(NuevoIns){
    inscripciones = NuevoIns; // Función para cambiar el valor de las inscripciones
}

