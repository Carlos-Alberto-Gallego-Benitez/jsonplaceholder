import axios from "axios";

async function update(action, values) {
  const RUTA_API = `${process.env.REACT_APP_URL_API_POT}`;
  const token = window.parent.consultarToken();
  const formData = new FormData();
  //const respCamposOblig = camposObligatorios(action, values);

  try {
    const { data } = await axios.put(
      RUTA_API + action,
      formData.append("values", values),
      {
        headers: { token: token, "Content-Type": "application/json" },
        params: { values },
      }
    );
    if (data.message === "Dato editado exitosamente") {
      window.parent.msgInformacion(data.message);
      return "ok";
    } else {
      window.parent.msgAdvertencia("Error:" + data.message);
      return "err";
    }
  } catch (error) {
    window.parent.msgError("Error al editar", error?.toString());
    return error;
  }
}

export default update;
