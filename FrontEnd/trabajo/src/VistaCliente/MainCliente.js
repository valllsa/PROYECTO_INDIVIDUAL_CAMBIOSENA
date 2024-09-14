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
  const [Matricula, setMatricula] = useState('');
  const [camionRecomendado, setCamionRecomendado] = useState(null);
  const [clientInfo, setClientInfo] = useState({});

  useEffect(() => {
    fetchCamiones();
  }, []);

  const validateMatricula = (matricula) => {
    return /^[A-Z]{3}\d{3}$/.test(matricula);
  };

  const fetchCamiones = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/ListaCam");
      console.log("Camiones recibidos:", data);
      setCamiones(data);

      const clientResponse = await axios.get(`http://localhost:4000/api/cliente/${data[0].id}`);
      setClientInfo(clientResponse.data);
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
    }
  };

  const recomendarCamion = (peso) => {
    const camion = camiones.find(c => parseInt(c.Capacidad) >= parseInt(peso) && c.Estado === 'Disponible');
    setCamionRecomendado(camion || 'No hay camiones disponibles para este peso.');
  };

  const handleSolicitudSubmit = async () => {
    if (!Matricula || !carga || !destino) {
      alert('Por favor, complete todos los campos antes de enviar la solicitud.');
      return;
    }

    if (!validateMatricula(Matricula)) {
      alert('Por favor, ingrese una matrícula válida (AAA123).');
      return;
    }

    try {
      // Envía la solicitud al servidor
      const response = await axios.post("http://localhost:4000/Cliente", {
        Matricula,
        carga,
        destino
      });

      // Actualiza el estado del camión en la API del cliente
      await axios.post(`http://localhost:4000/api/cliente/${response.data.id}`, {
        Matricula: Matricula,
        Carga: carga,
        Destino: destino,
        FechaInicio: new Date().toISOString(),
        FechaFin: null
      });

      // Actualiza el estado del camión en la lista local
      await axios.patch(`http://localhost:4000/ListaCam/${Matricula}`, {
        Estado: "Ocupado"
      });

      setSolicitudEstado('Solicitud realizada con éxito. El camión ahora está Ocupado.');

      // Actualiza la información del cliente en la interfaz
      const updatedClientInfo = await axios.get(`http://localhost:4000/Cliente/${response.data.id}`);
      setClientInfo(updatedClientInfo.data);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error.response?.data || error.message);
      if (error.response?.status === 404) {
        setSolicitudEstado('El camión seleccionado no existe o ya está alquilado.');
      } else if (error.response?.status === 500) {
        setSolicitudEstado('Ha ocurrido un error en el servidor. Por favor, intente nuevamente.');
      } else {
        setSolicitudEstado('Ha ocurrido un error al procesar su solicitud. Error: ' + (error.response?.data?.message || error.message));
      }
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
            <select id="camion" className="form-select bg-white text-dark select-lg" value={Matricula} onChange={(e) => setMatricula(e.target.value)}>
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
