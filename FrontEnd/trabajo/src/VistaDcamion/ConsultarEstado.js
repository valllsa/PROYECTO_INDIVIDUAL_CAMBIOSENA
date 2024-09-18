import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const ConsultarEstado = () => {
  const location = useLocation();
  const [camiones, setCamiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamionesAlquilados = async () => {
      try {
        // Realizar la solicitud GET a la API de AlquilarCamion
        const response = await axios.get('http://localhost:4000/ListaCam');
        setCamiones(response.data);
      } catch (error) {
        console.error('Error al obtener los camiones:', error);
        setError('Error al obtener los camiones.');
      } finally {
        setLoading(false);
      }
    };

    fetchCamionesAlquilados();
  }, []);

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
              <li className="nav-items">
                <Link
                  className={`nav-link custom-font-size ${location.pathname === '/VerReportesCamiones' ? 'active text-white' : ''}`}
                  aria-current="page"
                  to="/VerReportesCamiones"
                >
                  Reportes de los camiones
                </Link>
              </li>
              <li className="nav-items">
                <Link
                  className={`nav-link custom-font-size ${location.pathname === '/ConsultarEstado' ? 'active text-white' : ''}`}
                  to="/ConsultarEstado"
                >
                  Consultar Estado
                </Link>
              </li>
            </ul>
            <div className='button-logout'>
            <div className='button-logout'>
                            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
                        </div>
          </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <h2>Consulta del Estado de los Camiones</h2>
        {loading ? (
          <p>Cargando camiones...</p>
        ) : error ? (
          <p>{error}</p>
        ) : camiones.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {camiones.map((camion) => (
                <tr key={camion.id}>
                  <td>{camion.Matricula}</td>
                  <td>{camion.Estado }</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay camiones para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultarEstado;
