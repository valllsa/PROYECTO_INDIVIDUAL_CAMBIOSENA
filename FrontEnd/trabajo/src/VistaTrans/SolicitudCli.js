import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const SolicitudCli = () => {
    const location = useLocation();
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener las solicitudes
        fetch('http://localhost:4000/ListaCam')
            .then(response => response.json())
            .then(data => setSolicitudes(data))
            .catch(error => console.error('Error:', error));
    }, []);

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
                            <li className="nav-item">
                                <Link className={`nav-link custom-font-size ${location.pathname === '/SolicitudCli' ? 'active text-white' : ''}`} aria-current="page" to="/SolicitudCli">
                                    Solicitudes
                                </Link>
                            </li>
                            <li className="nav-item">
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
            <div className="container mt-4">
                <h2>Solicitudes de Alquiler</h2>
                {solicitudes.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Camión solicitado</th>
                                <th>Carga requerida</th>
                                <th>Destino de la solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map(solicitud => (
                                <tr key={solicitud.camionMatricula}>
                                    <td>{solicitud.camionMatricula}</td>
                                    <td>{solicitud.carga}</td>
                                    <td>{solicitud.destino}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay solicitudes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SolicitudCli;
