import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Añadido el ícono FaPlus
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';

const Transportadores = () => {
    const location = useLocation();
    const [transportadores, setTransportadores] = useState([]);
    const [formData, setFormData] = useState({
        Nombre: '',
        Telefono: '',
        Correo: '',
        Usuario: '',
        Contrasena: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchTransportadores();
    }, []);

    useEffect(() => {
        if (editingIndex !== null && transportadores[editingIndex]) {
            setFormData(transportadores[editingIndex]);
        } else {
            setFormData({
                Nombre: '',
                Telefono: '',
                Correo: '',
                Usuario: '',
                Contrasena: ''
            });
        }
    }, [editingIndex, transportadores]);

    const fetchTransportadores = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/Users_Trans');
            setTransportadores(data);
        } catch (error) {
            console.error('Error al cargar transportadores:', error);
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
                const { data } = await axios.post('http://localhost:4000/Users_Trans', formData);
                setTransportadores([...transportadores, data]);
                toast.success('Transportador registrado con éxito.');
            } catch (error) {
                console.error('Error al registrar transportador:', error);
            }
        } else {
            handleUpdate();
        }
        setEditingIndex(null);
    };

    const handleUpdate = async () => {
        const updatedTransportador = { ...formData };

        try {
            const { data } = await axios.put(`http://localhost:4000/Users_Trans/${transportadores[editingIndex].id}`, updatedTransportador);
            setTransportadores(transportadores.map((trans, index) => index === editingIndex ? data : trans));
            toast.success('Transportador actualizado con éxito.');
        } catch (error) {
            console.error('Error al actualizar transportador:', error);
        }
    };

    const handleDelete = async (index) => {
        const transportadorId = transportadores[index].id;
        try {
            await axios.delete(`http://localhost:4000/Users_Trans/${transportadorId}`);
            setTransportadores(transportadores.filter((_, i) => i !== index));
            toast.success('Transportador eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar transportador:', error);
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
                        <img src="Images/camion.png" alt="Gestión de Transportadores" className="Logo-navbar" />
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
                                <li className="nav-items">
                                    <Link
                                        className={`nav-link ${location.pathname === '/MainAdmin' ? 'active text-white' : ''}`}
                                        to="/MainAdmin"
                                    >
                                        Camiones
                                    </Link>
                                </li>
                                <li className="nav-items">
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
                    <h2>Gestionar Transportadores</h2>
                    {/* Botón para abrir el modal */}
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#transportadorModal"
                    >
                        <FaPlus />
                    </button>

                    {/* Modal para agregar o editar transportadores */}
                    <div
                        className="modal fade"
                        id="transportadorModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {editingIndex === null ? 'Registrar Transportador' : 'Actualizar Transportador'}
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
                                            className='bg-white'
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
                                            name="Contrasena"
                                            value={formData.Contrasena}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="submit" className="btn btn-primary mt-3">
                                            {editingIndex === null ? 'Registrar' : 'Actualizar'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de transportadores */}
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
                            {transportadores.map((transportador, index) => (
                                <tr key={transportador.id}>
                                    <td>{transportador.Nombre}</td>
                                    <td>{transportador.Telefono}</td>
                                    <td>{transportador.Correo}</td>
                                    <td>{transportador.Usuario}</td>
                                    <td>{transportador.Contrasena}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(index)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#transportadorModal"
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

export default Transportadores;
