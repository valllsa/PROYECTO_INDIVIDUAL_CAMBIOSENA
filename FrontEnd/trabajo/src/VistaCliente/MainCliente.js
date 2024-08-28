import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClienteInterfaz = () => {
  const [carga, setCarga] = useState('');
  const [destino, setDestino] = useState('');
  const [solicitudEstado, setSolicitudEstado] = useState(null);
  const [camiones, setCamiones] = useState([]);
  const [camionSeleccionado, setCamionSeleccionado] = useState('');
  const [camionRecomendado, setCamionRecomendado] = useState(null);

  useEffect(() => {
    const fetchCamiones = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ListaCam");
        setCamiones(response.data);
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
      }
    };
    fetchCamiones();
  }, []);

  const recomendarCamion = (peso) => {
    const camion = camiones.find(c => peso <= c.Capacidad);
    setCamionRecomendado(camion || 'No hay camiones disponibles para este peso.');
  };

  const handleSolicitudSubmit = async () => {
    if (!camionSeleccionado) {
      alert('Por favor, seleccione un camión.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/AlquilarCam", {
        camionId: camionSeleccionado,
        carga,
        destino,
      });
      setSolicitudEstado('Solicitud realizada con éxito.');
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setSolicitudEstado('Error al realizar la solicitud.');
    }
  };

  const handleConsultaEstado = () => {
    console.log('Consultando estado de la solicitud...');
    setSolicitudEstado('Estado de la solicitud: En proceso.');
  };

  const handleLogout = () => {
    window.location.href = '/PaginaBienvenida';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Tu Marca</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/CancelarSer">Cancelación de servicios</Link>
              </li>
            </ul>
            <div className="ml-auto d-flex align-items-center">
              <button type="button" onClick={handleLogout} className="btn btn-primary">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <h1>Solicitud de Servicios</h1>

        <div>
          <h2>Camiones Registrados</h2>
          <table className="camiones-table">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Capacidad (kg)</th>
                <th>Consumo (gal/km)</th>
                <th>Carga Actual (kg)</th>
              </tr>
            </thead>
            <tbody>
              {camiones.map((camion, index) => (
                <tr key={index}>
                  <td>{camion.Matricula}</td>
                  <td>{camion.Capacidad}</td>
                  <td>{camion.Gasolina}</td>
                  <td>{camion.CargaActual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="camion">Seleccionar Camión:</label>
          <select
            id="camion"
            value={camionSeleccionado}
            onChange={(e) => setCamionSeleccionado(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', width: 'calc(100% - 20px)' }}
          >
            <option value="">Seleccione un camión</option>
            {camiones.map((camion, index) => (
              <option key={index} value={camion.Matricula}>
                {camion.Matricula} - Capacidad: {camion.Capacidad} kg
              </option>
            ))}
          </select>
          </div>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="carga">Carga:</label>
          <input
            type="number"
            id="carga"
            value={carga}
            onChange={(e) => {
              setCarga(e.target.value);
              recomendarCamion(e.target.value);
            }}
            style={{ marginLeft: '10px', padding: '8px', width: 'calc(100% - 20px)' }}
          />
        </div>
        
        
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="destino">Destino:</label>
          <input
            type="text"
            id="destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', width: 'calc(100% - 20px)' }}
          />
        </div>

        

        <button
          onClick={handleSolicitudSubmit}
          style={{ marginTop: '20px', padding: '10px', backgroundColor: '#003366', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Alquilar camión
        </button>

        {/* Mover el mensaje de estado aquí para que se muestre justo debajo del botón */}
        {solicitudEstado && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>Estado de la Solicitud:</h3>
            <p>{solicitudEstado}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Consultar Estado de Solicitud</h2>
        <button
          onClick={handleConsultaEstado}
          style={{ padding: '10px', backgroundColor: '#003366', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Consultar Estado
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Recomendación de Camión</h2>
        {camionRecomendado && (
          <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>Camión Recomendado:</h3>
            <p>{camionRecomendado.Matricula || camionRecomendado}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteInterfaz;
