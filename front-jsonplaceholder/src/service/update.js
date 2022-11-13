import axios from "axios";
import Swal from 'sweetalert2'

let RUTA_API = null;

async function update(action, api) {

  if (api === 1) { RUTA_API = `${process.env.REACT_APP_URL_API_USUARIOS}` }
  if (api === 2) { RUTA_API = `${process.env.REACT_APP_URL_API_PUBLICACIONES}` }
  if (api === 3) { RUTA_API = `${process.env.REACT_APP_URL_API_TRANSACCIONES}` }

  try {
    const { data } = await axios.put(
      RUTA_API + action,
    );
    if (data === "Dato editado exitosamente") {
      window.parent.msgInformacion(data.message);
      return "ok";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: data.message.toStrig()
      })
      return "err";
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error',
      text: error.message.toStrig()
    })
    return error;
  }
}

export default update;
