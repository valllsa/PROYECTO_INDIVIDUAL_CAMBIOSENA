import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const EstadoCamion = () => {
    const location = useLocation();
    const [camiones, setCamiones] = useState([]);
    const [camionSeleccionado, setCamionSeleccionado] = useState('');
    const [estadoCarga, setEstadoCarga] = useState('');
    const [estadoCamion, setEstadoCamion] = useState('');
    const [fechaReporte, setFechaReporte] = useState(''); // Estado para la fecha del reporte
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // API para obtener la lista de camiones
        axios.get('http://localhost:4000/Cliente')
            .then(response => setCamiones(response.data))
            .catch(error => {
                console.error('Error al obtener camiones:', error);
                toast.error('Error al obtener camiones.');
            });
    }, []);

    const handleReporteSubmit = async () => {
        if (!camionSeleccionado || !estadoCarga || !estadoCamion || !fechaReporte) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }
    
        try {
            // Enviar el reporte a la API usando axios
            const response = await axios.post('http://localhost:4000/Reportes', {
                camionSeleccionado: camionSeleccionado,
                estadoCarga: estadoCarga,
                estadoCamion: estadoCamion,
                fechaReporte: fechaReporte // Enviar la fecha del reporte
            });
    
            // Muestra la alerta correcta si la respuesta es exitosa
            if (response.status === 200 || response.status === 201) {
                toast.success('Reporte enviado con éxito.');
                setMensaje('Reporte enviado con éxito.');
            } 
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            toast.error('Error al enviar el reporte.');
        }
    };

    const handleLogout = () => {
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
                            <li className="nav-items">
                                <Link className={`nav-link custom-font-size ${location.pathname === '/SolicitudCli' ? 'active text-white' : ''}`} aria-current="page" to="/SolicitudCli">
                                    Solicitudes
                                </Link>
                            </li>
                            <li className="nav-items">
                                <Link className={`nav-link custom-font-size ${location.pathname === '/MainTrans' ? 'active text-white' : ''}`} to="/MainTrans">
                                    Operacion
                                </Link>
                            </li>
                        </ul>
                        <div className='button-logout'>
                            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1>Estado del Camión</h1>

                <div>
                    <h2>Reportar Estado</h2>
                    <div>
                        <label htmlFor="camion" style={{ fontSize: '1.2rem', marginRight: '10px' }}>Camión:</label>
                        <select
                            id="camion"
                            value={camionSeleccionado}
                            onChange={(e) => setCamionSeleccionado(e.target.value)}
                            style={{ fontSize: '1.2rem', padding: '10px', width: '100%' }}
                        >
                            <option value="">Selecciona un camión</option>
                            {camiones.map((camion) => (
                                <option key={camion.id} value={camion.Matricula}>
                                    {camion.Matricula} - Capacidad: {camion.Capacidad} kg - Consumo: {camion.Gasolina} gal/km
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <label htmlFor="fechaReporte" style={{ fontSize: '1.2rem', marginRight: '10px' }}>Fecha del Reporte:</label>
                        <input
                            type="date"
                            id="fechaReporte"
                            value={fechaReporte}
                            onChange={(e) => setFechaReporte(e.target.value)}
                            style={{ fontSize: '1.2rem', padding: '10px', width: '100%' }}
                            className='bg-white'
                        />
                    </div>


                    <div style={{ marginTop: '15px' }}>
                        <label htmlFor="estadoCarga" style={{ fontSize: '1.2rem', marginRight: '10px' }}>Estado de la Carga:</label>
                        <input
                            type="text"
                            id="estadoCarga"
                            value={estadoCarga}
                            onChange={(e) => setEstadoCarga(e.target.value)}
                            placeholder="Ej. Carga completa"
                            style={{ fontSize: '1.2rem', padding: '10px', width: '100%' }}
                        />
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <label htmlFor="estadoCamion" style={{ fontSize: '1.2rem', marginRight: '10px' }}>Estado del Camión:</label>
                        <input
                            type="text"
                            id="estadoCamion"
                            value={estadoCamion}
                            onChange={(e) => setEstadoCamion(e.target.value)}
                            placeholder="Ej. Camión en buen estado"
                            style={{ fontSize: '1.2rem', padding: '10px', width: '100%' }}
                        />
                    </div>

                    {/* Campo de fecha del reporte */}
                   
                    <button
                        onClick={handleReporteSubmit}
                        className="btn-registrar-camion mt-3"
                    >
                        Enviar Reporte
                    </button>

                    {mensaje && <p className="mt-2">{mensaje}</p>}
                </div>
            </div>

            {/* ToastContainer para mostrar las alertas */}
            <ToastContainer />
        </div>
    );
};

export default EstadoCamion;
