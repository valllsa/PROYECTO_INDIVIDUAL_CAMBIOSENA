import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../Estilos/estilos.css';

const CancelarSer = () => {
  const location = useLocation();
  const [alquileres, setAlquileres] = useState([]);
  const [alquilerSeleccionado, setAlquilerSeleccionado] = useState('');
  const [estadoCancelacion, setEstadoCancelacion] = useState('');

  useEffect(() => {
    fetchAlquileres();
  }, []);

  const fetchAlquileres = async () => {
    try {
      const response = await axios.get("http://localhost:4000/AlquilarCam");
      console.log("Alquileres recibidos:", response.data);
      setAlquileres(response.data);
    } catch (error) {
      console.error("Error al obtener los alquileres:", error);
      setEstadoCancelacion('Error al obtener los alquileres.');
    }
  };

  const handleCancelacionSubmit = async () => {
    if (!alquilerSeleccionado) {
      window.alert('Por favor, seleccione un alquiler antes de cancelar.');
      return;
    }

    const alquiler = alquileres.find(a => a.id === alquilerSeleccionado);
    const Matricula = alquiler?.Matricula;

    // Verificar si la cancelación se puede realizar con 4 días de anticipación
    const fechaActual = new Date();
    const fechaInicioAlquiler = new Date(alquiler?.fechaInicio);
    const fechaLimiteCancelacion = new Date(fechaInicioAlquiler);
    fechaLimiteCancelacion.setDate(fechaLimiteCancelacion.getDate() - 4);

    if (fechaActual > fechaLimiteCancelacion) {
      window.alert('No se puede cancelar el alquiler. Se requiere al menos 4 días de anticipación.');
      return;
    }

    try {
      await axios.post("http://localhost:4000/AlquilarCam", { 
        idAlquiler: alquilerSeleccionado 
      });

      setAlquileres(prevAlquileres =>
        prevAlquileres.filter(alquiler => alquiler.id !== alquilerSeleccionado)
      );

      window.alert(`El alquiler del camión con matrícula ${Matricula} ha sido cancelado con éxito.`);
    } catch (error) {
      console.error("Error al cancelar el alquiler:", error);
      window.alert('Error al cancelar el alquiler.');
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
        <h2 className="text-dark">Cancelar Alquiler</h2>
        <div className="mb-3">
          <label htmlFor="alquiler" className="form-label text-dark">Seleccionar Alquiler:</label>
          <select id="alquiler" className="form-select bg-white text-dark select-lg" value={alquilerSeleccionado} onChange={(e) => setAlquilerSeleccionado(e.target.value)}>
            <option value="">Seleccione un alquiler</option>
            {alquileres.map((alquiler) => (
              <option key={alquiler.id} value={alquiler.id}>
                {alquiler.Matricula} - Destino: {alquiler.destino} - Carga: {alquiler.carga} kg
              </option>
            ))}
          </select>
        </div>
        
        <button onClick={handleCancelacionSubmit} className="btn-registrar-camion">Cancelar Alquiler</button>
      </div>
    </div>
  );
};

export default CancelarSer;
