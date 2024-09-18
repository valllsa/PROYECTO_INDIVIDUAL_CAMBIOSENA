import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/estilos.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos

const GestionarMantenimiento = () => {
  const location = useLocation();
  const [camiones, setCamiones] = useState([]);
  const [mantenimiento, setMantenimiento] = useState({
    camionSeleccionado: '',
    fechaUltimoMantenimiento: '',
    tipoMantenimiento: '',
    observaciones: '',
  });

  useEffect(() => {
    // API para obtener la lista de camiones
    fetch('http://localhost:4000/ListaCam')
      .then(response => response.json())
      .then(data => setCamiones(data))
      .catch(error => console.error('Error al obtener camiones:', error));
  }, []);

  const handleMantenimientoChange = (e) => {
    setMantenimiento({
      ...mantenimiento,
      [e.target.name]: e.target.value,
    });
  };

  const handleCamionChange = (e) => {
    setMantenimiento({
      ...mantenimiento,
      camionSeleccionado: e.target.value,
    });
  };

  const actualizarMantenimiento = async () => {
    if (!mantenimiento.camionSeleccionado || !mantenimiento.fechaUltimoMantenimiento || !mantenimiento.tipoMantenimiento) {
      toast.error("Por favor, complete todos los campos necesarios.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/Mantenimiento", mantenimiento);
      toast.success("Mantenimiento actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el mantenimiento:", error);
      toast.error("Error al actualizar el mantenimiento.");
    }
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
            <img src="Images/camion.png" alt="Gestión de Camiones" className="Logo-navbar" />
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link custom-font-size ${location.pathname === '/GestionarMantenimiento' ? 'active text-white' : ''}`}
                  aria-current="page"
                  to="/GestionarMantenimiento"
                >
                  Gestión de Mantenimiento
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link custom-font-size ${location.pathname === '/ConsultarEstado' ? 'active text-white' : ''}`}
                  to="/ConsultarEstado"
                >
                  Consultar Estado
                </Link>
              </li>
            </ul>
            <div className='button-logout'>
              <button type="button" onClick={handleLogout} className="bg-dark d-flex ml-auto">
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <h2>Mantenimiento y Actualización</h2>

        <div>
          <label htmlFor="camionSeleccionado">Seleccionar Camión:</label>
          <select
            id="camionSeleccionado"
            name="camionSeleccionado"
            value={mantenimiento.camionSeleccionado}
            onChange={handleCamionChange}
            className="form-control bg-white text-dark"
          >
            <option value="">Selecciona un camión</option>
            {camiones.map((camion) => (
              <option key={camion.id} value={camion.Matricula}>
                {camion.Matricula} - Capacidad: {camion.Capacidad} kg - Consumo: {camion.Gasolina} gal/km
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="fechaUltimoMantenimiento">Fecha del Último Mantenimiento:</label>
        <input
          type="date"
          name="fechaUltimoMantenimiento"
          value={mantenimiento.fechaUltimoMantenimiento}
          onChange={handleMantenimientoChange}
          className="form-control bg-white text-dark"
        />

        <div className="form-group">
          <label htmlFor="tipoMantenimiento">Tipo de Mantenimiento:</label>
          <input
            type="text"
            name="tipoMantenimiento"
            value={mantenimiento.tipoMantenimiento}
            onChange={handleMantenimientoChange}
            placeholder="Tipo de mantenimiento"
            className="form-control bg-white text-dark"
          />
        </div>
        <div className="form-group">
          <label htmlFor="observaciones">Observaciones:</label>
          <textarea
            name="observaciones"
            value={mantenimiento.observaciones}
            onChange={handleMantenimientoChange}
            placeholder="Añadir observaciones relevantes"
            className="form-control border-dark shadow-sm p-2"
          />
        </div>
        <button onClick={actualizarMantenimiento} className="btn-registrar-camion">
          Actualizar Mantenimiento
        </button>
      </div>

      {/* ToastContainer para mostrar las alertas */}
      <ToastContainer />
    </div>
  );
};

export default GestionarMantenimiento;
