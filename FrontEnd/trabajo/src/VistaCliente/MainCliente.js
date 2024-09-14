import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';
import { FaSignOutAlt } from 'react-icons/fa';


const ClienteInterfaz = () => {
  const location = useLocation();
  const [carga, setCarga] = useState('');
  const [destino, setDestino] = useState('');
  const [solicitudEstado, setSolicitudEstado] = useState(null);
  const [camiones, setCamiones] = useState([]);
  const [Matricula, setMatricula] = useState('');
  const [camionRecomendado, setCamionRecomendado] = useState(null);
  const [clientInfo, setClientInfo] = useState({});

  // Función para obtener camiones
  const fetchCamiones = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/ListaCam");
      setCamiones(data);

      if (data.length > 0) {
        const clientResponse = await axios.get(`http://localhost:4000/api/cliente/${data[0].id}`);
        setClientInfo(clientResponse.data);
      }
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
    }
  };

  useEffect(() => {
    fetchCamiones();
  }, []);

  const validateMatricula = (matricula) => /^[A-Z]{3}\d{3}$/.test(matricula);

  const recomendarCamion = (peso) => {
    const camion = peso <= 15000
      ? camiones.find(c => c.Matricula === 'ABC123' && c.Estado === 'Disponible')
      : camiones.find(c => c.Matricula === 'MKJ099' && c.Estado === 'Disponible');
    setCamionRecomendado(camion || null);
  };

  const handleSolicitudSubmit = async () => {
    if (!Matricula || !carga || !destino) {
      toast.error('Por favor, complete todos los campos antes de enviar la solicitud.');
      return;
    }

    if (!validateMatricula(Matricula)) {
      toast.error('Por favor, ingrese una matrícula válida (AAA123).');
      return;
    }

    const cargaNumero = parseFloat(carga);
    if (isNaN(cargaNumero) || cargaNumero <= 0) {
      toast.error('Por favor, ingrese una carga válida.');
      return;
    }

    const camionSeleccionado = camiones.find(c => c.Matricula === Matricula);
    if (!camionSeleccionado) {
      toast.error('El camión seleccionado no existe.');
      setSolicitudEstado('El camión seleccionado no existe.');
      return;
    }

    if (camionSeleccionado.Estado !== 'Disponible') {
      toast.error('El camión seleccionado ya está alquilado.');
      return;
    }

    if (cargaNumero > camionSeleccionado.Capacidad) {
      toast.error('La carga excede la capacidad del camión seleccionado.');
      return;
    }

    try {
      await axios.post("http://localhost:4000/Cliente", { Matricula, carga, destino });
      await axios.patch(`http://localhost:4000/ListaCam/${camionSeleccionado.id}`, {
        Estado: "Ocupado",
        CargaActual: cargaNumero
      });

      toast.success('Solicitud realizada con éxito. El camión ahora está Ocupado.');
      fetchCamiones(); // Actualiza la lista de camiones después de la solicitud
    } catch (error) {
      console.error("Error al procesar la solicitud:", error.response?.data || error.message);
      const message = error.response?.status === 404
        ? 'El camión seleccionado no existe o ya está alquilado.'
        : error.response?.status === 500
        ? 'Ha ocurrido un error en el servidor. Por favor, intente nuevamente.'
        : 'Ha ocurrido un error al procesar su solicitud.';
      setSolicitudEstado(message);
      toast.error(message);
    }
  };

  const handleLogout = () => window.location.href = '/PaginaBienvenida';

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
            <div className='button-logout'>
            <button type="button" onClick={handleLogout} className=" bg-dark d-flex ml-auto">
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
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
  
          <button className="btn-registrar-camion" onClick={handleSolicitudSubmit}>Enviar Solicitud</button>
  
          <div className="alert-container">
            {solicitudEstado && (
              <div className={`alert ${solicitudEstado.includes('éxito') ? 'alert-success' : 'alert-danger'}`} role="alert">
                {solicitudEstado}
              </div>
            )}
  
            {camionRecomendado && (
              <div className="alert alert-info">
                <strong>Camión Recomendado:</strong> {camionRecomendado.Matricula} - Capacidad: {camionRecomendado.Capacidad} kg
              </div>
            )}
          </div>
        </div>
      </div>
  
      <ToastContainer />
    </div>
  );
};

export default ClienteInterfaz;
