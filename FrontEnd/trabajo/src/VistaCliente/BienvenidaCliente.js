
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BienvenidaCliente = () => {
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
      <h1>Bienvenido, {cliente?.Nombre}</h1>
      <p>Estás en la página principal del cliente.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <Link to="/MainCliente">Ir a Alquilar Camión</Link>
    </div>
  );
};

export default BienvenidaCliente;
