import '../../../style/login.css'
import wave from "../../../icons/wave.png";
import undraw_in_sync_xwsa from "../../../icons/undraw_in_sync_xwsa.svg";
import avatar_male from "../../../icons/avatar_male.svg";
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import select from "../../../service/select"
import encode64 from "../../../helpers/encode64"


export default function Login() {

    const events = () => {
        window.demoLogin();
        //window.focusFunc();
        //window.blurFunc();
    }

    const [login, setLogin] = useState({
        user: '',
        passw: ''
    })


    //set de los valores del logueo
    const handleChange = (e, name) => {
        if (e.target.checked) {
            setLogin(
                { ...login, chkRadio: e.target.value }
            )
        } else {
            setLogin(
                { ...login, [e.target.name]: e.target.value, }
            )
        }
    }

    const logueo = async () => {
        if (login.user === '' || login.user === null || login.user === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe ingresar un usuario',
            })
            return
        }
        if (login.passw === '' || login.passw === null || login.passw === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe ingresar un password',
            })
            return
        }
        let { data } = await select(`login?query=${encode64(JSON.stringify({ user: login.user, passw: login.passw }))}`, 1)
        if (data === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario o clave incorrectos',
            })
            return
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Logueado correctamente',
            })
            localStorage.setItem("sessions_social_network", encode64(JSON.stringify(data)));
            window.location.href = 'http://localhost:8340/jsonplaceholder'
        }
    }


    return (
        <>
            <img className="wave" src={wave} alt='' />
            <div className="container container-login">
                <div className="img">
                    <img src={undraw_in_sync_xwsa} alt='' />
                </div>
                <div className="login-container">
                    <div className='mb-4'>
                        <img className="avatar" src={avatar_male} alt='' />
                    </div>
                    <h2>Bienvenido</h2>
                    <div className="input-div one mt-3" >
                        <div className="i">
                            <i className="fas fa-user" ></i>
                        </div>
                        <div>
                            <h5>Usuario</h5>
                            <input className="input" onClick={() => { events() }} name='user' onChange={(e) => { handleChange(e, 'user') }} type="text" />
                        </div>
                    </div>

                    <div className="input-div two mb-4" onClick={() => { events() }}>
                        <div className="i">
                            <i className="fas fa-lock"></i>
                        </div>
                        <div>
                            <h5>Contraseña</h5>
                            <input className="input" name='passw' onChange={(e) => { handleChange(e, 'passw') }} type="password" />
                        </div>
                    </div>
                    <a className='mt-3' href="##">¿Olvidaste la contraseña?</a>
                    <input type="submit" className="btn-login mt-" value="Login" onClick={() => { logueo() }} />
                </div>
            </div>
        </>
    )
}