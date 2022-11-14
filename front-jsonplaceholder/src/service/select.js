import axios from "axios";
import Swal from 'sweetalert2'

let RUTA_API = null;

async function select(action, api) {

  if (api === 1) { RUTA_API = `${process.env.REACT_APP_URL_API_USUARIOS}` }
  if (api === 2) { RUTA_API = `${process.env.REACT_APP_URL_API_PUBLICACIONES}` }
  if (api === 3) { RUTA_API = `${process.env.REACT_APP_URL_API_TRANSACCIONES}` }
  try {
    const { data } = await axios.get(
      RUTA_API + action, { headers: { "token": 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYmFyIiwiZXhwIjoxNjY4Mzk1NjQzLCJpYXQiOjE2NjgzOTU0MTh9.JSIFV5-Va0e_TcipCz9CAL_JiKScS-Wd5phPfk1dpRzbNXN66qRdwLiAz9Ukg1fd3nvLqhvpMxdGA6UjBnS_ic17-aieXXy6rfOR7rPhhrniWaTgjw-angJgPGj7KBnOtgDV2l_xWK_s75W8j0-a-1lOgYb-0VyWgqDz59su4ytylD9eHSbYGcGqjAngBIfcqhf09KMpROjOsKiT84K_qWODneAd2Eul_Zx6nboCQZvpu5l1JLa3L9j998nFxKo9No0mU4KdstWcSduwMRuuKIycoW-oHD-8RWQcGqxYotibIPOpovgC-_IM-r3YtwofXkTQNV4MvysEKhb6Bc852g728sw0RdkR2uuuklxsVW959keQEE65Xac1kHN1O0B89MHB2tpZscZEDqOoUQ8zr5WSxkSKrGO_xqJdiML-qyhw4uCoIOwa9KMqn_Mr4PDCM8DVz3V3uMOkA6E-b5LOrAB58vECFSe2z8o4CGHw65Mne1VFtWNcdvqiwNajQs84ZZBaTDAlbxqzobEASMTl7rfvFBR-RHYQ4x3kMiRdN8ZS15hOOlKuwjt1OT6P1MBG3Pwzflf9o8KufnVi6B1SBQ-toHB1nVBsjljJAJ3axjUiTUAAL-ReY6YX6CkJN78QpPymqRCMzQgVDBhRDE2hB3PVArBHtzaYymRNBxy4jMM' } }
    );
    debugger
    return { data };
  } catch (error) {
    debugger
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error',
      text: error.response ? error.response.statusText : error.message
    })
    if (error.response) {
      if (error.response.data.message === 'jwt expired') {
        alert();
      }
    }
    throw error
  }
}

export default select;
