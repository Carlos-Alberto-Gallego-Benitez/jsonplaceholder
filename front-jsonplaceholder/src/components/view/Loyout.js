import Home from "./home/Home"
import Footer from "./footer/Footer"
import Usuario from "./usuario/Usuario"


export default function Loyout({ path }) {
    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="index.html">Social network</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="##"><i className="fas fa-bars"></i></button>
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="ingrese id de usuario" aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
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
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Dashboard</div>
                                <a className="nav-link" href="jsonplaceholder">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Inicio
                                </a>
                                <div className="sb-sidenav-menu-heading">Usuario</div>
                                <a className="nav-link collapsed" href="users" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Listar Usuarios
                                </a>
                                <a className="nav-link collapsed" href="##" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Listar Publicaciones
                                </a>

                                <div className="sb-sidenav-menu-heading">Peticiones</div>
                                <a className="nav-link" href="charts.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                    Listar Peticiones
                                </a>

                            </div>
                        </div>
                    </nav>
                </div>
                {/*contenido de la pagina*/}
                {path === 'home' ? <Home /> : ''}
                {path === 'users' ? <Usuario /> : ''}
            </div>
            <Footer />
        </>
    )
}