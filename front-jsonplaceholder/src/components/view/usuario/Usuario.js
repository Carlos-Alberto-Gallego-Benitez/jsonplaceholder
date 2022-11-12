import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'

export default function Usuario() {

    return (
        <>
            <Container fluid={true} className='mt-5'>
                <Barratitulos titulo={'Gestión de usuarios'} />
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Listado de Usuarios
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Identificador</th>
                                        <th>Correo</th>
                                        <th>Dirección</th>
                                        <th>Teléfono</th>
                                        <th>Sitio Web</th>
                                        <th>Empresa</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Identificador</th>
                                        <th>Correo</th>
                                        <th>Dirección</th>
                                        <th>Teléfono</th>
                                        <th>Sitio Web</th>
                                        <th>Empresa</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>Edinburgh</td>
                                        <td>61</td>
                                        <td>2011/04/25</td>
                                        <td>$320,800</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}