import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'
import IconButton from '../../common/IconButton'
import { useParams } from "react-router-dom";
import exportDatos from '../../../service/exportDatos'
import encode64 from "../../../helpers/encode64"

export default function Usuario({ setLoad }) {

    //estado principal que almacena los usuarios a listar
    const [users, setUsers] = useState([])

    //carga inicial o render
    useEffect(() => {
        async function aux() {
            setLoad(true)
            try {
                let { data } = await select('index', 1);
                setUsers(data)
            } catch (error) {
                setLoad(false)
            }

            setTimeout(() => {
                window.dataTable()
            }, 300)
            setLoad(false)
        }
        aux()
    }, [])


    //exportar datos a excel
    const expoDatos = () => {
        setLoad(true)
        let arrayData = [];
        for (let i = 0; i < users.length; i++) {
            let encodeRow = encode64(JSON.stringify({ nombre: users[i].name, username: users[i].username, email: users[i].email, direccion: users[i].address.city + ' ' + users[i].address.street, cel: users[i].phone, web: users[i].website, empresa: users[i].company.name }));
            let row = { nombre: users[i].name, username: users[i].username, email: users[i].email, direccion: users[i].address.city + ' ' + users[i].address.street, cel: users[i].phone, web: users[i].website, empresa: users[i].company.name, encode: encodeRow };
            arrayData.push(row)
        }
        let columnsName = [
            "Nombre",
            "Identificador",
            "Correo",
            "Dirección",
            "Teléfono",
            "Sitio Web",
            "Empresa",
            "Encode64"
        ];
        let columnsFilter = [
            "nombre",
            "username",
            "email",
            "direccion",
            "cel",
            "web",
            "empresa",
            "encode"
        ];
        let tamanocolumns = [7, 7, 7, 7, 7, 7, 7, 55];
        exportDatos("Reporte_Usuarios", 1, columnsName, columnsFilter, arrayData, tamanocolumns)
        setLoad(false)
    }


    return (
        <>
            <Container className='mt-5'>
                <Barratitulos titulo={'Gestión de usuarios'} />
                <div className='flex-excel'>
                    <IconButton className='excel' title='Reporte excel' onClick={() => { expoDatos() }} />
                </div>
                <div className="card mt-3">
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
                                        users && users.length > 0 ? users.map((e) => {
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