import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/estilos.css';
import { FaSignOutAlt } from 'react-icons/fa';

const BienvenidaCliente = () => {
  const location = useLocation();
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clienteLocalStorage = localStorage.getItem('cliente');
    if (clienteLocalStorage) {
      setCliente(JSON.parse(clienteLocalStorage));
    } else {
      navigate('/LoginCliente');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    navigate('/PaginaBienvenida');
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
              <li className="nav-itemS">
                <Link className={`nav-link custom-font-size ${location.pathname === '/MainCliente' ? 'active text-white' : ''}`} to="/MainCliente">
                  Alquilar Camión
                </Link>
              </li>
            </ul>
            <div className="button-logout">
            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ">
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
            </div>
          </div>
        </div>
      </nav>
    <div className="welcome-container">
      <h1>Bienvenido, {cliente?.Nombre}</h1>
      <p>Estás en la página principal del cliente. Aqui podra alquilar el camion que mejor se adapte a sus necesidades, al igual podra cancelarel servicio
        , pero OJO, podra cancelarel servicion con 5 dias de anticipacion</p>
    
    </div>
    </div>
  );
};

export default BienvenidaCliente;
