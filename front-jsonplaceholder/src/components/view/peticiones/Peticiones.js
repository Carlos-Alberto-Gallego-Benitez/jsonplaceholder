import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'

export default function Peticiones() {

    const [peticiones, setPeticiones] = useState([])

    useEffect(() => {
        async function aux() {
            let { data } = await select('index', 3);
            setPeticiones(data)
            setTimeout(() => {
                window.dataTable()
            }, 300)
        }
        aux()
    }, [])

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
                                    {
                                        peticiones && peticiones.length > 0 ? peticiones.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e.name}</td>
                                                        <td>{e.username}</td>
                                                        <td>{e.email}</td>
                                                        <td>{e.address.city + ' ' + e.address.street}</td>
                                                        <td>{e.phone}</td>
                                                        <td>{e.website}</td>
                                                        <td>{e.company.name}</td>
                                                    </tr>
                                                </>
                                            )
                                        }) : ''
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}