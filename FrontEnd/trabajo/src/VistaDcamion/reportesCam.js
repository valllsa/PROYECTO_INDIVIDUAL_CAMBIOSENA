import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link,  useLocation } from 'react-router-dom';

const VerReportesCamiones = () => {
const location = useLocation();
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        // Hacer una solicitud GET a la API que devuelve los reportes
        const response = await axios.get('http://localhost:4000/Reportes');
        setReportes(response.data);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
        setError('Error al obtener los reportes.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
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
        <h2>Reportes de Camiones</h2>
        {loading ? (
          <p>Cargando reportes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : reportes.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Estado de Carga</th>
                <th>Observaciones</th>
                <th>Fecha del reporte</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte) => (
                <tr key={reporte.id}>
                  <td>{reporte.camionSeleccionado}</td>
                  <td>{reporte.estadoCarga}</td>
                  <td>{reporte.estadoCamion}</td>
                  <td>{reporte.fechaReporte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay reportes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default VerReportesCamiones;
