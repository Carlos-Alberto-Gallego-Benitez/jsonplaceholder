import Home from "./home/Home"
import Footer from "./footer/Footer"
import Usuario from "./usuario/Usuario"
import { NavLink } from "react-router-dom";
import Publicaciones from "./publicaciones/Publicaciones"
import Load from "../common/Load"
import { useState } from 'react'
import Peticiones from "./peticiones/Peticiones";
import Fotos from "./usuario/Fotos";
import Search from "./search/Search";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function Loyout({ path }) {

    //navegador router
    const navigate = useNavigate();

    const [load, setLoad] = useState(false)
    const [searchG, setSearchG] = useState(0)

    const buscarUser = (e) => {
        console.log(searchG)
        if (searchG) {
            if (searchG !== null && searchG !== '' && searchG !== undefined) {
                navigate(`/search/${searchG}`)
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Ingrese un valor',
            })
        }
    }

    return (
        <>
            <Load visible={load} />
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark font-main">
                <a className="navbar-brand" href="index.html">Social network</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="##"><i className="fas fa-bars"></i></button>
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input type='number' className="form-control" onChange={(e) => { setSearchG(e.target.value) }} placeholder="ingrese id de usuario" aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={(e) => { buscarUser() }} type="button"><i className="fas fa-search" ></i></button>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown" href="##" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="login.html">Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav" className="font-main">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Dashboard</div>
                                <NavLink className="nav-link" to="/">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Inicio
                                </NavLink>
                                <div className="sb-sidenav-menu-heading">Usuario</div>
                                <NavLink className="nav-link collapsed" to="/users" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Listar Usuarios
                                </NavLink>
                                <NavLink className="nav-link collapsed" to="/publicaciones" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Listar Publicaciones
                                </NavLink>
                                <NavLink className="nav-link collapsed" to="/fotos" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Fotos
                                </NavLink>

                                <div className="sb-sidenav-menu-heading">Peticiones</div>
                                <NavLink className="nav-link" to="/peticiones">
                                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                    Listar Peticiones
                                </NavLink>

                            </div>
                        </div>
                    </nav>
                </div>
                {/*contenido de la pagina*/}
                {path === 'home' ? <Home setLoad={setLoad} /> : ''}
                {path === 'users' ? <Usuario setLoad={setLoad} /> : ''}
                {path === 'publicaciones' ? <Publicaciones setLoad={setLoad} /> : ''}
                {path === 'peticiones' ? <Peticiones setLoad={setLoad} /> : ''}
                {path === 'fotos' ? <Fotos setLoad={setLoad} /> : ''}
                {path === 'search' ? <Search setLoad={setLoad} /> : ''}
            </div>
            <Footer />
        </>
    )
}