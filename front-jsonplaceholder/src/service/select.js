import axios from "axios";

let RUTA_API = null;

async function select(action, api) {

  if (api === 1) { RUTA_API = `${process.env.REACT_APP_URL_API_USUARIOS}` }
  if (api === 2) { RUTA_API = `${process.env.REACT_APP_URL_API_PUBLICACIONES}` }
  if (api === 3) { RUTA_API = `${process.env.REACT_APP_URL_API_TRANSACCIONES}` }
  try {
    const { data } = await axios.get(
      RUTA_API + action
    );
    return { data };
  } catch (error) {
    throw error
  }
}

export default select;
