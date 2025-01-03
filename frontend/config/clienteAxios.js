import config from './variablesConfig.js';

const clienteAxios = axios.create({baseURL:`${config.VITE_BACKEND_URL_DEV}/api`});

export default clienteAxios;