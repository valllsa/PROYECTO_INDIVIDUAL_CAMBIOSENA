import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaSignOutAlt, FaPlus } from 'react-icons/fa'; // Añadido el ícono FaPlus
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';

const Clientes = () => {
    const location = useLocation();
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        Nombre: '',
        Teléfono: '',
        Correo: '',
        NumeroDocumento: '',
        Usuario: '',
        Contraseña: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    useEffect(() => {
        if (editingIndex !== null && clientes[editingIndex]) {
            setFormData(clientes[editingIndex]);
        } else {
            setFormData({
                Nombre: '',
                Teléfono: '',
                Correo: '',
                NumeroDocumento: '',
                Usuario: '',
                Contraseña: ''
            });
        }
    }, [editingIndex, clientes]);

    const fetchClientes = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/Cliente');
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
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
                const { data } = await axios.post('http://localhost:4000/Cliente', formData);
                setClientes([...clientes, data]);
                toast.success('Cliente registrado con éxito.');
            } catch (error) {
                console.error('Error al registrar cliente:', error);
            }
        } else {
            handleUpdate();
        }
        setEditingIndex(null);
    };

    const handleUpdate = async () => {
        const updatedCliente = { ...formData };

        try {
            const { data } = await axios.put(`http://localhost:4000/Cliente/${clientes[editingIndex].id}`, updatedCliente);
            setClientes(clientes.map((cli, index) => index === editingIndex ? data : cli));
            toast.success('Cliente actualizado con éxito.');
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
        }
    };

    const handleDelete = async (index) => {
        const clienteId = clientes[index].id;
        try {
            await axios.delete(`http://localhost:4000/Cliente/${clienteId}`);
            setClientes(clientes.filter((_, i) => i !== index));
            toast.success('Cliente eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
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
                    <h2>Gestionar Clientes</h2>
    

                    {/* Modal para agregar o editar clientes */}
                    <div
                        className="modal fade"
                        id="clienteModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {editingIndex === null ? 'Registrar Cliente' : 'Actualizar Cliente'}
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
                                            name="Teléfono"
                                            value={formData.Teléfono}
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
                                            placeholder="Número de Documento"
                                            name="NumeroDocumento"
                                            value={formData.NumeroDocumento}
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
                                        <button type="submit" className="btn btn-primary mt-3">
                                            {editingIndex === null ? 'Registrar' : 'Actualizar'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de clientes */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Número de Documento</th>
                                <th>Usuario</th>
                                <th>Contraseña</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente, index) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.Nombre}</td>
                                    <td>{cliente.Teléfono}</td>
                                    <td>{cliente.Correo}</td>
                                    <td>{cliente.NumeroDocumento}</td>
                                    <td>{cliente.Usuario}</td>
                                    <td>{cliente.Contraseña}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(index)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#clienteModal"
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

export default Clientes;
