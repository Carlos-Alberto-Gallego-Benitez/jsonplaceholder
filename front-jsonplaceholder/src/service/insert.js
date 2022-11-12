import axios from "axios";

const formData = new FormData();

async function insert(action, values) {
  let token = window.parent.consultarToken();
  //let respCamposOblig = camposObligatorios(action, values);
  const RUTA_API = `${process.env.REACT_APP_URL_API_POT}`;
  formData.append("values", values);

  try {
    const { data } = await axios.post(RUTA_API + action, formData, {
      headers: { token: token, "Content-Type": "application/json" },
      params: { values },
    });
    if (data.message === "Dato registrado exitosamente") {
      //LimpiarCampos(action);
      window.parent.msgInformacion(data.message);
      return data.data;
    } else {
      window.parent.msgAdvertencia("Error:" + data.message);
      return "err";
    }
  } catch (error) {
    window.parent.msgError("Error al registrar", error?.toString());
    return error;
  }
}

export default insert;
