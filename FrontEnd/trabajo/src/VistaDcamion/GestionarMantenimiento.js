import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/estilos.css';


const GestionarMantenimiento = () => {  
  const location = useLocation();
  const [mantenimiento, setMantenimiento] = useState({
    fechaUltimoMantenimiento: '',
    tipoMantenimiento: '',
    observaciones: '',
  });

  const handleMantenimientoChange = (e) => {
    setMantenimiento({
      ...mantenimiento,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarMantenimiento = async () => {
    if (!mantenimiento.fechaUltimoMantenimiento || !mantenimiento.tipoMantenimiento) {
      alert("Por favor, complete todos los campos necesarios.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/Mantenimiento", mantenimiento);
      alert("Mantenimiento actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el mantenimiento:", error);
      alert("Error al actualizar el mantenimiento.");
    }
  };

  const handleLogout = () => {
    alert("Redirigiendo a la página de inicio de sesión...");
    window.location.href = '/PaginaBienvenida'; 
};
  return (
    <div >
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
                    Gestion de Mantenimiento
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
                        <div >
                            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>
        <div className="container">
      <h2>Mantenimiento y Actualización</h2>
        <label>Fecha del Último Mantenimiento:</label>
        <input
          type="date"
          name="fechaUltimoMantenimiento"
          value={mantenimiento.fechaUltimoMantenimiento}
          onChange={handleMantenimientoChange}
          className="form-control bg-white text-dark"
        />
      
      <div className="form-group">
        <label>Tipo de Mantenimiento:</label>
        <input
          type="text"
          name="tipoMantenimiento"
          value={mantenimiento.tipoMantenimiento}
          onChange={handleMantenimientoChange}
          placeholder="tipoMantenimiento"
          className="form-control bg-white text-dark"
        />
      </div>
      <div className="form-group">
        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          value={mantenimiento.observaciones}
          onChange={handleMantenimientoChange}
          placeholder="Añadir observaciones relevantes"
          className="form-control border-dark shadow-sm p-2"
        />
      </div>
      <button onClick={actualizarMantenimiento}>
        Actualizar Mantenimiento
      </button>
    </div>
    </div>
  );
};

export default GestionarMantenimiento;
