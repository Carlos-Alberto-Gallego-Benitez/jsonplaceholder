import { Container } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'
import IconButton from '../../common/IconButton'
import encode64 from '../../../helpers/encode64'
import exportDatos from '../../../service/exportDatos'


export default function Fotos({ setLoad }) {

    //estados recolectores
    const [fotos, setFotos] = useState([])
    const [users, setUsers] = useState([])
    const [albums, setAlbums] = useState([])

    //carga inicial de la grid o render
    useEffect(() => {
        async function aux() {
            setLoad(true)
            //peticiones para cargar los valores de las grid
            let { data } = await select('photos', 1);
            let usr = await select('index', 1);
            let album = await select('albums', 1);
            setUsers(usr.data)
            setFotos(data)
            setAlbums(album.data)
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
        for (let i = 0; i < fotos.length; i++) {
            let encodeRow = encode64(JSON.stringify({ titulo: fotos[i].title, identificador: fotos[i].id, user: users.find(obj => obj.id === albums.find(obj => obj.id === fotos[i].albumId).userId).name, album: albums.find(obj => obj.id === fotos[i].albumId).title, url: fotos[i].url }));
            let row = { titulo: fotos[i].title, identificador: fotos[i].id, user: users.find(obj => obj.id === albums.find(obj => obj.id === fotos[i].albumId).userId).name, album: albums.find(obj => obj.id === fotos[i].albumId).title, url: fotos[i].url, encode: encodeRow };
            arrayData.push(row)
        }
        let columnsName = [
            "Título",
            "Identificador",
            "Usuario",
            "Álbum",
            "Url",
            "Encode64"
        ];
        let columnsFilter = [
            "titulo",
            "identificador",
            "user",
            "album",
            "url",
            "encode"
        ];
        let tamanocolumns = [25, 7, 9, 24, 15, 55];
        exportDatos("Reporte_Publicaciones", 3, columnsName, columnsFilter, arrayData, tamanocolumns)
        setLoad(false)
    }

    return (
        <>
            <Container fluid={true} className='mt-5'>
                <Barratitulos titulo={'Gestión de Fotos'} />
                <div className='flex-excel'>
                    <IconButton className='excel' title='Reporte excel' onClick={() => { expoDatos() }} />
                </div>
                <div className="card mt-3">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Listado de fotos
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Identificador</th>
                                        <th>Título</th>
                                        <th>Usuario</th>
                                        <th>Álbum</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Identificador</th>
                                        <th>Título</th>
                                        <th>Usuario</th>
                                        <th>Álbum</th>
                                        <th>Imagen</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        fotos && fotos.length > 0 ? fotos.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e.id}</td>
                                                        <td>{e.title}</td>
                                                        <td>{users.find(obj => obj.id === albums.find(obj => obj.id === e.albumId).userId).name}</td>
                                                        <td>{albums.find(obj => obj.id === e.albumId).title}</td>
                                                        <td><img src={e.url} className='tamano-imagen' alt='' /></td>
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