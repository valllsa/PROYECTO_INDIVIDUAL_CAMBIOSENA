import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainTrans = () => {
  const camiones = [
    { id: 1, placa: 'ABC123', capacidad: 1000, gasolina: 0.20 },
    { id: 2, placa: 'DFG456', capacidad: 3000, gasolina: 0.25 },
    { id: 3, placa: 'HIJ789', capacidad: 5000, gasolina: 0.30 },
    { id: 4, placa: 'KLM098', capacidad: 10000, gasolina: 0.35 },
  ];

  const [camionSeleccionado, setCamionSeleccionado] = useState('');
  const [operacion, setOperacion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estadoCarga, setEstadoCarga] = useState('');
  const [estadoCamion, setEstadoCamion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarOperacion = () => {
    const camion = camiones.find(c => c.placa === camionSeleccionado);

    if (camionSeleccionado && operacion && cantidad) {
      if (operacion === 'cargar' && cantidad > camion.capacidad) {
        setMensaje(`Error: La cantidad supera la capacidad del camión ${camion.placa}.`);
      } else {
        setMensaje(`Operación de ${operacion} de ${cantidad} kg realizada en el camión ${camion.placa} con éxito.`);
      }
    } else {
      setMensaje('Por favor, selecciona un camión, una operación y especifica la cantidad.');
    }
  };

  const handleOperacionSubmit = () => {
    manejarOperacion();
  };

  const handleReporteSubmit = () => {
    setMensaje('Reporte enviado con éxito.');
  };

  const handleLogout = () => {
    window.location.href = '/PaginaBienvenida'; // Redirigir al usuario a la página de inicio de sesión
};

  return (
      <div className="Cont-button">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Tu Marca</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/solicitudes">Solicitudes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/MainAdmin">Camiones</Link>
                </li>
              </ul>
              <div className="ml-auto d-flex align-items-center">
                <button type="button" onClick={handleLogout} className="btn btn-primary">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </nav>
      <div>
      <h1>Transportador</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Operación del Camión</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="camion">Camión:</label>
          <select
            id="camion"
            value={camionSeleccionado}
            onChange={(e) => setCamionSeleccionado(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
          >
            <option value="">Selecciona un camión</option>
            {camiones.map((camion) => (
              <option key={camion.id} value={camion.placa}>
                {camion.placa} - Capacidad: {camion.capacidad} kg - Consumo: {camion.gasolina} gal/km
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="operacion">Operación:</label>
          <select
            id="operacion"
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
          >
            <option value="">Selecciona una operación</option>
            <option value="cargar">Cargar</option>
            <option value="descargar">Descargar</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="cantidad">Cantidad (kg):</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ej. 1000"
            style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
          />
        </div>
        <button
          onClick={handleOperacionSubmit}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#b83c75',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Ejecutar Operación
        </button>
      </div>

      <div>
        <h2>Reportar Estado</h2>
        <div style={{ marginBottom: '10px'
         }}>
          <label htmlFor="estadoCarga">Estado de la Carga:</label>
          <input
            type="text"
            id="estadoCarga"
            value={estadoCarga}
            onChange={(e) => setEstadoCarga(e.target.value)}
            placeholder="Ej. Carga completa"
            style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="estadoCamion">Estado del Camión:</label>
          <input
            type="text"
            id="estadoCamion"
            value={estadoCamion}
            onChange={(e) => setEstadoCamion(e.target.value)}
            placeholder="Ej. Camión en buen estado"
            style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
          />
        </div>
        <button
          onClick={handleReporteSubmit}
          style={{ padding: '10px', backgroundColor: '#b83c75', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Enviar Reporte
        </button>
      </div>

      {mensaje && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <p>{mensaje}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default MainTrans;
