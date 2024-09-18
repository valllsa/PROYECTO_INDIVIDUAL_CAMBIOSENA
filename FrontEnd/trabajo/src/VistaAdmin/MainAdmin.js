import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaSignOutAlt, FaPlus } from 'react-icons/fa'; // Añadido el ícono FaPlus
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';

const Cliente = () => {
    const location = useLocation();
    const [camiones, setCamiones] = useState([]);
    const [formData, setFormData] = useState({
        Matricula: '',
        Capacidad: '',
        Gasolina: '',
        CargaActual: '',
        Estado: 'Disponible'
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchCamiones();
    }, []);

    useEffect(() => {
        if (editingIndex !== null && camiones[editingIndex]) {
            setFormData(camiones[editingIndex]);
        } else {
            setFormData({
                Matricula: '',
                Capacidad: '',
                Gasolina: '',
                CargaActual: '',
                Estado: 'Disponible'
            });
        }
    }, [editingIndex, camiones]);

    const fetchCamiones = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/ListaCam');
            setCamiones(data);
        } catch (error) {
            console.error('Error al cargar camiones:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleAvailableStatus = async (id) => {
        const camion = camiones.find(camion => camion.id === id);
        if (!camion) {
            console.error('Camión no encontrado.');
            return;
        }

        const updatedCamion = {
            ...camion,
            Estado: 'Disponible',
            CargaActual: ''
        };

        try {
            const { data } = await axios.put(`http://localhost:4000/ListaCam/${id}`, updatedCamion);
            setCamiones(camiones.map(cam => cam.id === id ? data : cam));
            toast.success('Camión marcado como disponible.');
        } catch (error) {
            console.error('Error al actualizar camión:', error);
        }
    };

    const enviar = async (e) => {
        e.preventDefault();
        if (editingIndex === null) {
            const matriculaRepetida = camiones.some(camion => camion.Matricula === formData.Matricula);
            if (matriculaRepetida) {
                toast.error("El camión con esta matrícula ya está registrado.");
                return;
            }

            try {
                const { data } = await axios.post('http://localhost:4000/ListaCam', formData);
                setCamiones([...camiones, data]);
                toast.success('Camión registrado con éxito.');
            } catch (error) {
                console.error('Error al registrar camión:', error);
            }
        } else {
            handleUpdate();
        }
        setEditingIndex(null);
    };

    const handleUpdate = async () => {
        const updatedCamion = { ...formData };

        if (updatedCamion.Estado === 'Disponible') {
            updatedCamion.CargaActual = '';
        }

        try {
            const { data } = await axios.put(`http://localhost:4000/ListaCam/${camiones[editingIndex].id}`, updatedCamion);
            setCamiones(camiones.map((cam, index) => index === editingIndex ? data : cam));
            toast.success('Camión actualizado con éxito.');
        } catch (error) {
            console.error('Error al actualizar camión:', error);
        }
    };

    const handleDelete = async (index) => {
        const camionId = camiones[index].id;
        try {
            await axios.delete(`http://localhost:4000/ListaCam/${camionId}`);
            setCamiones(camiones.filter((_, i) => i !== index));
            toast.success('Camión eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar camión:', error);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleLogout = () => {
        toast.info("Redirigiendo a la página de inicio de sesión...");
        window.location.href = '/PaginaBienvenida';
    };

    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <div className="bienvenida-imagen-container">
                    <img src="Images/camion.png" alt="Gestión de Clientes" className="Logo-navbar" />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`nav-link custom-font-size ${location.pathname === '/solicitudes' ? ' text-white' : ''}`}
                                to="/solicitudes"
                            >
                                Solicitudes
                            </Link>
                        </li>
                    </ul>
                    <div className='button-logout'>
                            <button type="button" onClick={handleLogout} className="btn btn-dark d-flex ml-auto">
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
                        </div>
                </div>
            </div>
        </nav>
        <div className="d-flex flex-row h-100">
            {/* Sidebar */}
            <div>
                    <div>
                        <div
                            className="d-flex flex-column  bg-dark"
                            style={{ width: 199, height: 850}}
                        >
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <Link
                                    className={`nav-link ${location.pathname === '/MainAdmin' ? 'active text-white' : ''}`}
                                    to="/MainAdmin"
                                >
                                    Camiones
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link ${location.pathname === '/Clientes' ? 'active text-white' : ''}`}
                                    to="/Clientes"
                                >
                                    Clientes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link ${location.pathname === '/Transportadores' ? 'active text-white' : ''}`}
                                    to="/Transportadores"
                                >
                                    Transportadores
                                </Link>
                            </li>
                            <li>
                                    <Link
                                        className={`nav-link ${location.pathname === '/DueñoCam' ? 'active text-white' : ''}`}
                                        to="/DueñoCam"
                                    >
                                        Dueños de Camiones
                                    </Link>
                                </li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container">
                <h2>Gestionar Camiones</h2>
                {/* Botón para abrir el modal */}
                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#camionModal"
                >
                    <FaPlus /> 
                </button>

                {/* Modal para agregar o editar camiones */}
                <div
                    className="modal fade"
                    id="camionModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {editingIndex === null ? 'Registrar Camión' : 'Actualizar Camión'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={enviar}>
                                    <input
                                        type="text"
                                        placeholder="Matrícula"
                                        name="Matricula"
                                        value={formData.Matricula}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Capacidad de carga (kg)"
                                        name="Capacidad"
                                        value={formData.Capacidad}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Consumo de gasolina (gal/km)"
                                        name="Gasolina"
                                        value={formData.Gasolina}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="submit" className="btn btn-success">
                                        {editingIndex === null ? 'Registrar' : 'Actualizar'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Capacidad</th>
                            <th>Consumo de Gasolina</th>
                            <th>Carga Actual</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camiones.map((camion, index) => (
                            <tr key={camion.id}>
                                <td>{camion.Matricula}</td>
                                <td>{camion.Capacidad}</td>
                                <td>{camion.Gasolina}</td>
                                <td>{camion.CargaActual}</td>
                                <td>{camion.Estado}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(index)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#camionModal"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger me-2"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                    {camion.Estado === 'Ocupado' && (
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleAvailableStatus(camion.id)}
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cliente;
