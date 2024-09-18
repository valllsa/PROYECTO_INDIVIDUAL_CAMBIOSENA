import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';

const MainAdmin = () => {
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
                        <img src="Images/camion.png" alt="Gestión de Camiones" className="Logo-navbar" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link custom-font-size ${location.pathname === '/BienvenidaAdmin' ? 'active text-white' : ''}`}
                                    aria-current="page"
                                    to="/BienvenidaAdmin"
                                >
                                    ¡Bienvenid@!
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link custom-font-size ${location.pathname === '/solicitudes' ? 'active text-white' : ''}`}
                                    to="/solicitudes"
                                >
                                    Solicitudes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link custom-font-size ${location.pathname === '/MainAdmin' ? 'active text-white' : ''}`}
                                    to="/MainAdmin"
                                >
                                    Camiones
                                </Link>
                            </li>
                        </ul>
                        <div className='button-logout'>
                           <button type="button" onClick={handleLogout} className=" bg-dark d-flex ml-auto">
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <h2>Gestionar Camiones</h2>
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
                    <button type="submit" className="btn-registrar-camion">
                        {editingIndex === null ? 'Registrar Camión' : 'Actualizar Camión'}
                    </button>
                </form>

                <h2>Camiones Agregados</h2>
                <table className="camiones-table">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Capacidad (kg)</th>
                            <th>Consumo (gal/km)</th>
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
                                    <button onClick={() => handleEdit(index)} className="btn btn-warning">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="btn btn-danger">
                                        <FaTrash />
                                    </button>
                                    <button onClick={() => handleAvailableStatus(camion.id)} className="btn btn-success">
                                        <FaCheckCircle />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MainAdmin;
