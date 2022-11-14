import axios from "axios";
import Swal from 'sweetalert2'
import decode64 from "../helpers/decode64"

let RUTA_API = null;
let parseSession;
if (localStorage.getItem("sessions_social_network")) {
  parseSession = JSON.parse(decode64(localStorage.getItem("sessions_social_network")));
}


async function update(action, api) {

  if (api === 1) { RUTA_API = `${process.env.REACT_APP_URL_API_USUARIOS}` }
  if (api === 2) { RUTA_API = `${process.env.REACT_APP_URL_API_PUBLICACIONES}` }
  if (api === 3) { RUTA_API = `${process.env.REACT_APP_URL_API_TRANSACCIONES}` }

  try {
    let auth = parseSession ? parseSession.token ? parseSession.token : '0' : '0';
    const { data } = await axios.put(
      RUTA_API + action + '&tokencopia=' + auth,
      {
        headers: { token: auth, "Content-Type": "application/json" },
        params: { token: auth },
      }
    );
    if (data === "Ok") {
      Swal.fire({
        icon: 'success',
        title: 'Registro actualizado con éxito',
      })
      return "Ok";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: data.toStrig()
      })
      return "err";
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error',
      text: error.response ? error.response.statusText : error.message
    })
    if (error.response) {
      if (error.response.data.message === 'jwt expired' || error.response.data.message === 'jwt malformed') {
        window.location.href = 'http://localhost:8340/jsonplaceholder/login'
        localStorage.removeItem('sessions_social_network');
      }
    }
    throw error
  }
}

export default update;
