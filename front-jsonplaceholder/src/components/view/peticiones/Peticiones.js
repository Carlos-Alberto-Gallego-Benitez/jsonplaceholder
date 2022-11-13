import { Container, Modal, Button, Col, Row, Form } from 'react-bootstrap'
import Barratitulos from '../informativo/Barratitulos'
import { useEffect, useState } from 'react'
import select from '../../../service/select'
import IconButton from '../../common/IconButton'
import encode64 from '../../../helpers/encode64'
import exportDatos from '../../../service/exportDatos'
import update from "../../../service/update"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Peticiones({ setLoad }) {

    //navegador de rutas de react router
    const navigate = useNavigate();

    //estados modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [peticiones, setPeticiones] = useState([])

    const [render, setRender] = useState(0);

    const [elementConsulta, setElementConsulta] = useState({
        nombre: '',
        fecha: '',
        metodo: '',
        url: '',
        respuesta: '',
        catch: '',
        id: ''
    })

    //carga inicial o render
    useEffect(() => {
        async function aux() {
            setLoad(true)
            await listPeticiones()
            setTimeout(() => {
                window.dataTable()
            }, 300)
            setLoad(false)
        }
        aux()
    }, [])

    useEffect(() => {

    }, [peticiones])

    //listado de peticiones
    const listPeticiones = async () => {
        let { data } = await select('index', 3);
        setPeticiones(data[0])
    }

    //repote de excel
    const expoDatos = () => {
        setLoad(true)
        let arrayData = [];
        for (let i = 0; i < peticiones.length; i++) {
            let encodeRow = encode64(JSON.stringify({ nombre: peticiones[i].nombre, id: peticiones[i].id, url: peticiones[i].url, fecha: peticiones[i].fecha, metodo: peticiones[i].metodo, respuesta_api: peticiones[i].respuesta_api, catch_respuesta: peticiones[i].catch_respuesta }));
            let row = { nombre: peticiones[i].nombre, id: peticiones[i].id, url: peticiones[i].url, fecha: peticiones[i].fecha, metodo: peticiones[i].metodo, respuesta_api: peticiones[i].respuesta_api, catch_respuesta: peticiones[i].catch_respuesta, encode: encodeRow };
            arrayData.push(row)
        }
        let columnsName = [
            "Nombre",
            "Identificador",
            "Url",
            "Fecha",
            "Método",
            "Respuesta",
            "Catch Error",
            "Encode64"
        ];
        let columnsFilter = [
            "nombre",
            "id",
            "url",
            "fecha",
            "metodo",
            "respuesta_api",
            "catch_respuesta",
            "encode"
        ];
        let tamanocolumns = [5, 5, 17, 10, 4, 25, 25, 55];
        exportDatos("Reporte_Peticiones", 4, columnsName, columnsFilter, arrayData, tamanocolumns)
        setLoad(false)
    }

    //set de los valores de la consulta
    const handleChange = (e, name) => {
        if (e.target.checked) {
            setElementConsulta(
                { ...elementConsulta, chkRadio: e.target.value }
            )
        } else {
            setElementConsulta(
                { ...elementConsulta, [e.target.name]: e.target.value, }
            )
        }
    }

    //carga los datos de la petición a editar
    const editar = (id) => {
        let peticionEditar = peticiones.find(obj => obj.id === id)
        setElementConsulta({
            ...elementConsulta, "id": id,
            nombre: peticionEditar.nombre,
            fecha: peticionEditar.fecha,
            metodo: peticionEditar.metodo,
            url: peticionEditar.url,
            respuesta: peticionEditar.respuesta_api,
            catch: peticionEditar.catch_respuesta
        }
        )
    }

    //función para guardar la petición a editar o editada
    const guardar = async () => {
        let rspUpdate = await update(`update?query=${encode64(JSON.stringify(elementConsulta))}`, 3);
        if (rspUpdate === 'Ok') {
            setLoad(true)
            handleClose()
            await listPeticiones()
            setLoad(false)
            navigate("/peticiones")
        }
    }

    const eliminar = async () => {
        Swal.fire({
            title: 'Estás seguro de eliminar este registro?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await update(`delete?query=${encode64(JSON.stringify(elementConsulta))}`, 3)
                //wal.fire('Registro eliminado con éxito', '', 'success')
            } else if (result.isDenied) {
            }
        })
    }

    return (
        <>
            <Container fluid={true} className='mt-5'>
                <Barratitulos titulo={'Gestión de Peticiones'} />
                <div className='flex-excel'>
                    <IconButton className='excel' title='Reporte excel' onClick={() => { expoDatos() }} />
                </div>
                <div className="card mt-3">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Listado de Peticiones
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Identificador</th>
                                        <th>Url</th>
                                        <th>Nombre</th>
                                        <th>Fecha</th>
                                        <th>Método</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Identificador</th>
                                        <th>Url</th>
                                        <th>Nombre</th>
                                        <th>Fecha</th>
                                        <th>Método</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        peticiones && peticiones.length > 0 ? peticiones.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e.id}</td>
                                                        <td>{e.url}</td>
                                                        <td>{e.nombre}</td>
                                                        <td>{e.fecha}</td>
                                                        <td>{e.metodo}</td>
                                                        <td className='flx'><IconButton title='Editar Petición' onClick={() => {
                                                            editar(e.id)
                                                            handleShow()
                                                        }} className='icon-editar' /><IconButton className='icon-eliminar' title='Eliminar Petición' onClick={() => { eliminar() }} /></td>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Petición Nro {elementConsulta.id}</Modal.Title>
                    <IconButton
                        data-bs-dismiss="modal"
                        className={"icon-cancel icon-cerrar-modal"}
                        onClick={handleClose}
                        aria-label="Close"
                        title='Cerrar Formulario'
                    />
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                        </Col>
                    </Row>
                    <Form.Group className="mb-2">
                        <Form.Label className="lbl mb-2">
                            Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"nombre"}
                            onChange={(e) => { handleChange(e, 'nombre') }}
                            value={elementConsulta.nombre}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="lbl mb-2">
                            Fecha
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"fecha"}
                            onChange={(e) => { handleChange(e, 'fecha') }}
                            value={elementConsulta.fecha}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="lbl mb-2">
                            Método
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"metodo"}
                            onChange={(e) => { handleChange(e, 'metodo') }}
                            value={elementConsulta.metodo}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="lbl mb-2">
                            Url
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"url"}
                            onChange={(e) => { handleChange(e, 'url') }}
                            value={elementConsulta.url}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="lbl mb-2">
                            Respuesta
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"respuesta"}
                            onChange={(e) => { handleChange(e, 'respuesta') }}
                            value={elementConsulta.respuesta}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="lbl ">
                            Catch Errores
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="inputs-forms-admin focus-admin-register"
                            name={"catch"}
                            onChange={(e) => { handleChange(e, 'catch') }}
                            value={elementConsulta.catch}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='btn-principales' onClick={() => {
                        guardar()
                    }}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}