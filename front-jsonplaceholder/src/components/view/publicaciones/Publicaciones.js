
import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'
import IconButton from '../../common/IconButton'
import encode64 from '../../../helpers/encode64'
import exportDatos from '../../../service/exportDatos'

export default function Publicaciones({ setLoad }) {

    //estados recolectores
    const [publicaciones, setPublicaciones] = useState([])
    const [users, setUsers] = useState([])

    //carga inicial de la grid o render
    useEffect(() => {
        async function aux() {
            setLoad(true)
            //peticiones para cargar los valores de las grid
            let { data } = await select('index', 2);
            let usr = await select('index', 1);
            setUsers(usr.data)
            setPublicaciones(data)
            setTimeout(() => {
                window.dataTable()
            }, 300)
            setLoad(false)
        }
        aux()
    }, [])

    //repote de excel
    const expoDatos = () => {
        setLoad(true)
        let arrayData = [];
        for (let i = 0; i < publicaciones.length; i++) {
            let encodeRow = encode64(JSON.stringify({ titulo: publicaciones[i].title, identificador: publicaciones[i].id, user: users.find(obj => obj.id === publicaciones[i].userId).name, body: publicaciones[i].body }));
            let row = { titulo: publicaciones[i].title, identificador: publicaciones[i].id, user: users.find(obj => obj.id === publicaciones[i].userId).name, body: publicaciones[i].body, encode: encodeRow };
            arrayData.push(row)
        }
        let columnsName = [
            "Título",
            "Identificador",
            "Usuario",
            "Cuerpo del post",
            "Encode64"
        ];
        let columnsFilter = [
            "titulo",
            "identificador",
            "user",
            "body",
            "encode"
        ];
        let tamanocolumns = [15, 7, 9, 45, 55];
        exportDatos("Reporte_Publicaciones", 2, columnsName, columnsFilter, arrayData, tamanocolumns)
        setLoad(false)
    }



    return (
        <>
            <Container fluid={true} className='mt-5 font-main'>
                <Barratitulos titulo={'Gestión de usuarios'} />
                <div className='flex-excel'>
                    <IconButton className='excel' title='Reporte excel' onClick={() => { expoDatos() }} />
                </div>
                <div className="card mt-3 scroll-card mb-3">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Listado de Publicaciones
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