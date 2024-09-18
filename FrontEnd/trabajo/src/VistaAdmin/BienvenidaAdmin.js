import React from 'react';
import { Link, useLocation} from 'react-router-dom'; // Importa Link
import { FaSignOutAlt } from 'react-icons/fa'


const BienvenidaAdmin = () => { 
    const location = useLocation();
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
                    className={`nav-link custom-font-size ${location.pathname === '/BienvenidaAdmin' ? 'active text-white' : ''}`}
                    aria-current="page"
                    to="/BienvenidaAdmin"
                >
                    ¡Bienvenid@!
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link custom-font-size ${location.pathname === '/solicitudes' ? 'active text-white' : ''}`}
                    to="/solicitudes"
                >
                    Solicitudes
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link custom-font-size ${location.pathname === '/MainAdmin' ? 'active text-white' : ''}`}
                    to="/MainAdmin"
                >
                    Camiones
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
            
            <div className="welcome-container">
                <h1>Bienvenido Administrador</h1>
                <p>Estamos encantados de tenerte a bordo. Desde aquí podrás gestionar todas las solicitudes y consultar la información sobre los camiones. Utiliza el menú de navegación para acceder a las diferentes secciones del sistema.</p>
            </div>
        </div>
    );
};

export default BienvenidaAdmin;
