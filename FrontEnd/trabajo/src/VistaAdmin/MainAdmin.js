import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainAdmin = () => {
    const location = useLocation();
    const [camiones, setCamiones] = useState([]);
    const [formData, setFormData] = useState({
        Matricula: '',
        Capacidad: '',
        Gasolina: '',
        Estado: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        // Llamada  API para obtener camiones 
        fetch('http://localhost:4000/ListaCam')
            .then((response) => response.json())
            .then((data) => setCamiones(data))
            .catch((error) => console.error('Error al cargar camiones:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const enviar = (e) => {
        e.preventDefault();
        if (editingIndex === null) {
            // Registro de un nuevo camión
            fetch('http://localhost:4000/ListaCam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((nuevoCamion) => setCamiones([...camiones, nuevoCamion]))
                .catch((error) => console.error('Error al registrar camión:', error));
        } else {
            handleUpdate();
        }
        setFormData({ Matricula: '', Capacidad: '', Gasolina: '' });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(camiones[index]);
    };

    const handleUpdate = () => {
        const updatedCamion = { ...formData };

        fetch(`http://localhost:4000/ListaCam/${camiones[editingIndex].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCamion),
        })
            .then((response) => response.json())
            .then((camionActualizado) => {
                const camionesActualizados = [...camiones];
                camionesActualizados[editingIndex] = camionActualizado;
                setCamiones(camionesActualizados);
            })
            .catch((error) => console.error('Error al actualizar camión:', error));
    };

    const handleDelete = (index) => {
        const camionId = camiones[index].id;
        fetch(`http://localhost:4000/ListaCam/${camionId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const nuevosCamiones = camiones.filter((_, i) => i !== index);
                setCamiones(nuevosCamiones);
            })
            .catch((error) => console.error('Error al eliminar camión:', error));
    };
    const handleLogout = () => {
        alert("Redirigiendo a la página de inicio de sesión...");
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
                        <div >
                            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
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
                <input
                    type="text"
                    placeholder="Estado"
                    name="Estado"
                    value={formData.Estado}
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
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {camiones.map((camion, index) => (
                        <tr key={index}>
                            <td>{camion.Matricula}</td>
                            <td>{camion.Capacidad}</td>
                            <td>{camion.Gasolina}</td>
                            <td>{camion.Estado}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Editar</button>
                                <button onClick={() => handleDelete(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default MainAdmin;
