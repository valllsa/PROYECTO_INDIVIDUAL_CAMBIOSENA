import React from 'react';
import { Link, useLocation} from 'react-router-dom'; 


const BienvenidaTrans = () => { 
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
                    className={`nav-link custom-font-size ${location.pathname === '/BienvenidaCliente' ? 'active text-white' : ''}`}
                    aria-current="page"
                    to="/BienvenidaCliente"
                >
                    ¡Bienvenid@!
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link custom-font-size ${location.pathname === '/MainCliente' ? 'active text-white' : ''}`}
                    to="/MainCliente"
                >
                    Alquilar Camion
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link custom-font-size ${location.pathname === '/CancelarSer' ? 'active text-white' : ''}`}
                    to="/CancelarSer"
                >
                    Cancelacion de Servicio
                </Link>
            </li>
        </ul>
                        <div >
                            <button type="button" onClick={handleLogout} className="btn btn-primary bg-dark d-flex ml-auto">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="welcome-container">
                <h1>Bienvenido Cliente</h1>
                <p>Estamos encantados de tenerte a bordo. Desde aquí podrás alquilar el camion que mas se ajuste a tu necesidad. Utiliza el menú de navegación para acceder a las diferentes secciones del sistema.</p>
            </div>
        </div>
    );
};

export default BienvenidaTrans;
