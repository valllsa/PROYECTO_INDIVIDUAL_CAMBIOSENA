import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Añadido el ícono FaPlus
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';

const DueñoCam = () => {
    const location = useLocation();
    const [dueñoCam, setDueñoCam] = useState([]);
    const [formData, setFormData] = useState({
        Nombre: '',
        Telefono: '',
        Correo: '',
        Usuario: '',
        Contraseña: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchDuenosCam();
    }, []);

    useEffect(() => {
        if (editingIndex !== null && dueñoCam[editingIndex]) {
            setFormData(dueñoCam[editingIndex]);
        } else {
            setFormData({
                Nombre: '',
                Telefono: '',
                Correo: '',
                Usuario: '',
                Contraseña: ''
            });
        }
    }, [editingIndex, dueñoCam]);

    const fetchDuenosCam = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/Users_DCamion');
            setDueñoCam(data);
        } catch (error) {
            console.error('Error al cargar dueños de camiones:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const enviar = async (e) => {
        e.preventDefault();
        if (editingIndex === null) {
            try {
                const { data } = await axios.post('http://localhost:4000/Users_DCamion', formData);
                setDueñoCam([...dueñoCam, data]);
                toast.success('Dueño de camión registrado con éxito.');
            } catch (error) {
                console.error('Error al registrar dueño de camión:', error);
            }
        } else {
            handleUpdate();
        }
        setEditingIndex(null);
    };

    const handleUpdate = async () => {
        const updatedDuenosCam = { ...formData };

        try {
            const { data } = await axios.put(`http://localhost:4000/Users_DCamion/${dueñoCam[editingIndex].id}`, updatedDuenosCam);
            setDueñoCam(dueñoCam.map((dueno, index) => index === editingIndex ? data : dueno));
            toast.success('Dueño de camión actualizado con éxito.');
        } catch (error) {
            console.error('Error al actualizar dueño de camión:', error);
        }
    };

    const handleDelete = async (index) => {
        const duenocamId = dueñoCam[index].id;
        try {
            await axios.delete(`http://localhost:4000/Users_DCamion/${duenocamId}`);
            setDueñoCam(dueñoCam.filter((_, i) => i !== index));
            toast.success('Dueño de camión eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar dueño de camión:', error);
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
                        <img src="Images/camion.png" alt="Gestión de Dueños de Camiones" className="Logo-navbar" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link custom-font-size ${location.pathname === '/solicitudes' ? 'active text-white' : ''}`}
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
                    <h2>Gestionar Dueños de Camiones</h2>
                    {/* Botón para abrir el modal */}
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#duenoCamModal"
                    >
                        <FaPlus />
                    </button>

                    {/* Modal para agregar o editar dueños de camiones */}
                    <div
                        className="modal fade"
                        id="duenoCamModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {editingIndex === null ? 'Registrar Dueño de Camión' : 'Actualizar Dueño de Camión'}
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
                                            placeholder="Nombre"
                                            name="Nombre"
                                            value={formData.Nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Teléfono"
                                            name="Telefono"
                                            value={formData.Telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Correo"
                                            name="Correo"
                                            value={formData.Correo}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Usuario"
                                            name="Usuario"
                                            value={formData.Usuario}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Contraseña"
                                            name="Contraseña"
                                            value={formData.Contraseña}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="submit" className="btn btn-primary">
                                            {editingIndex === null ? 'Registrar' : 'Actualizar'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de dueños de camiones */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dueñoCam.map((dueno, index) => (
                                <tr key={dueno.id}>
                                    <td>{dueno.Nombre}</td>
                                    <td>{dueno.Telefono}</td>
                                    <td>{dueno.Correo}</td>
                                    <td>{dueno.Usuario}</td>
                                    <td>{dueno.Contraseña}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(index)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#duenoCamModal"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <FaTrash /> 
                                        </button>
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

export default DueñoCam;
