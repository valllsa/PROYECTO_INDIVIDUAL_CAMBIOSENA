import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../Estilos/estilos.css';

const ClienteInterfaz = () => {
  const location = useLocation();
  const [carga, setCarga] = useState('');
  const [destino, setDestino] = useState('');
  const [solicitudEstado, setSolicitudEstado] = useState(null);
  const [camiones, setCamiones] = useState([]);
  const [camionSeleccionado, setCamionSeleccionado] = useState('');
  const [camionRecomendado, setCamionRecomendado] = useState(null);

  useEffect(() => {
    fetchCamiones();
  }, []);

  const fetchCamiones = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ListaCam");
      console.log("Camiones recibidos:", response.data); 
      setCamiones(response.data);
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
    }
  };

  const recomendarCamion = (peso) => {
    const camion = camiones.find(c => parseInt(c.Capacidad) >= parseInt(peso) && c.Estado === 'Disponible');
    setCamionRecomendado(camion || 'No hay camiones disponibles para este peso.');
  };

  const handleSolicitudSubmit = async () => {
    if (!camionSeleccionado || !carga || !destino) {
      alert('Por favor, complete todos los campos antes de enviar la solicitud.');
      return;
    }

    try {
      await axios.post("http://localhost:4000/AlquilarCam", {
        camionMatricula: camionSeleccionado,
        carga,
        destino
      });

      setCamiones(prevCamiones => 
        prevCamiones.map(camion => 
          camion.Matricula === camionSeleccionado 
            ? { ...camion, Estado: 'Ocupado', CargaActual: carga } 
            : camion
        )
      );

      setSolicitudEstado('Solicitud realizada con éxito. El camión ahora está Ocupado.');
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setSolicitudEstado('Error al realizar la solicitud.');
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
              <li className="nav-item">
                <Link className={`nav-link custom-font-size ${location.pathname === '/BienvenidaCliente' ? 'active text-white' : ''}`} aria-current="page" to="/BienvenidaCliente">
                  ¡Bienvenid@!
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-font-size ${location.pathname === '/MainCliente' ? 'active text-white' : ''}`} to="/MainCliente">
                  Alquilar Camión
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-font-size ${location.pathname === '/CancelarSer' ? 'active text-white' : ''}`} to="/CancelarSer">
                  Cancelación de Servicios
                </Link>
              </li>
            </ul>
            <div>
              <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2 className="text-dark">Camiones Registrados</h2>
        <table className="camiones-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Capacidad (kg)</th>
              <th>Consumo (gal/km)</th>
              <th>Carga Actual (kg)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {camiones.map((camion) => (
              <tr key={camion.id}>
                <td>{camion.Matricula}</td>
                <td>{camion.Capacidad}</td>
                <td>{camion.Gasolina}</td>
                <td>{camion.CargaActual}</td>
                <td>{camion.Estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h2 className="text-dark">Alquilar Camión</h2>
          <div className="mb-3">
            <label htmlFor="camion" className="form-label text-dark">Seleccionar Camión:</label>
            <select id="camion" className="form-select bg-white text-dark select-lg" value={camionSeleccionado} onChange={(e) => setCamionSeleccionado(e.target.value)}>
              <option value="">Seleccione un camión</option>
              {camiones.filter(camion => camion.Estado === 'Disponible').map((camion) => (
                <option key={camion.id} value={camion.Matricula}>
                  {camion.Matricula} - Capacidad: {camion.Capacidad} kg
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="carga" className="form-label text-dark">Carga (kg):</label>
            <input 
              type="number" 
              id="carga" 
              className="form-control bg-white text-dark" 
              value={carga} 
              onChange={(e) => { 
                setCarga(e.target.value); 
                recomendarCamion(e.target.value); 
              }} 
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="destino" className="form-label text-dark">Destino:</label>
            <input 
              type="text" 
              id="destino" 
              className="form-control bg-white text-dark" 
              value={destino} 
              onChange={(e) => setDestino(e.target.value)} 
            />
          </div>

          <button onClick={handleSolicitudSubmit} className="btn-registrar-camion">Alquilar camión</button>

          {solicitudEstado && (
            <div className="alert alert-info mt-3">
              <h3>Estado de la Solicitud:</h3>
              <p>{solicitudEstado}</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-dark">Recomendación de Camión</h2>
          {camionRecomendado && (
            <div className={`alert ${typeof camionRecomendado === 'string' ? 'alert-danger' : 'alert-success'}`}>
              <h3>Camión Recomendado:</h3>
              <p>{typeof camionRecomendado === 'string' ? camionRecomendado : camionRecomendado.Matricula}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClienteInterfaz;
