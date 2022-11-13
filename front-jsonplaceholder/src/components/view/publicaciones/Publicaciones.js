
import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'

export default function Publicaciones() {

    const [publicaciones, setPublicaciones] = useState([])
    const [users, setUsers] = useState([])

    //carga inicial de la grid
    useEffect(() => {
        async function aux() {
            //peticiones para cargar los valores de las grid
            let { data } = await select('index', 2);
            let usr = await select('index', 1);
            setUsers(usr.data)
            setPublicaciones(data)
            setTimeout(() => {
                window.dataTable()
            }, 300)
        }
        aux()
    }, [])


    return (
        <>
            <Container fluid={true} className='mt-5 font-main'>
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
                                        <th>Título</th>
                                        <th>Identificador</th>
                                        <th>Usuario</th>
                                        <th>Cuerpo del post</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Título</th>
                                        <th>Identificador</th>
                                        <th>Usuario</th>
                                        <th>Cuerpo del post</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        publicaciones && publicaciones.length > 0 ? publicaciones.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e.title}</td>
                                                        <td>{e.id}</td>
                                                        <td>{users.find(obj => obj.id === e.userId).name}</td>
                                                        <td>{e.body}</td>
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