import axios from "axios";

async function select(action, page) {
  let token = window.parent.consultarToken();
  const RUTA_API = `${process.env.REACT_APP_URL_API_POT}`;
  const RUTA_API = `${process.env.REACT_APP_URL_API_POT}`;
  const RUTA_API = `${process.env.REACT_APP_URL_API_POT}`;

  try {
    const { data } = await axios.get(
      RUTA_API + action, { headers: { token: token, page, limit: 10 } }
    );
    return { data };
  } catch (error) {
    window.parent.msgAdvertencia("Error: " + error.message);
    throw error
  }
}

export default select;
