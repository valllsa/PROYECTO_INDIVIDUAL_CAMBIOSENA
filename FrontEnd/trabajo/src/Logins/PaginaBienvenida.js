import React from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/estilos.css';

const PaginaBienvenida = () => {
  return (
    <div className="bienvenida-container">
      <div className="bienvenida-content">
        <div className="bienvenida-imagen-container">
          <img src="Images/camion.png" alt="Gestión de Camiones" className="bienvenida-imagen" />
        </div>
        <div className="bienvenida-texto">
          <h1>¡Bienvenido a la Plataforma de Gestión de Camiones!</h1>
          <p>Explora todas las funcionalidades que ofrecemos haciendo clic en los botones de abajo.</p>
          <p>Estamos aquí para ayudarte a simplificar la gestión de tus camiones. ¡Comienza ahora!</p>
          <div className="bienvenida-buttons">
            <Link to="/LoginCliente" className="bienvenida-button">CLIENTE</Link>
            <Link to="/LoginAdmin" className="bienvenida-button">ADMINISTRADOR</Link>
            <Link to="/LoginTrans" className="bienvenida-button">TRANSPORTADOR</Link>
            <Link to="/LoginDcamion" className="bienvenida-button">DUEÑO CAMIÓN</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaBienvenida;
