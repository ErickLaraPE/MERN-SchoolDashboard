
/* Funcion generarID se emplea para generar un token inicial al generar un nuevo usuario */

const generarID = () => {

    const random = Math.random().toString(32).substring(2)
    const fechaHoy = Date.now().toString(32)

    return random + fechaHoy
}

export default generarID