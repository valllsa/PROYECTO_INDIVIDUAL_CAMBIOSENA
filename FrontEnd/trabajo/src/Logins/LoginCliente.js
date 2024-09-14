import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Estilos/estilos.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import '../Estilos/estilosAlerts.css'; // Para los estilos personalizados

function LoginCliente() {
  const [formData, setFormData] = useState({
    Usuario: '',
    Contraseña: ''
  });
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:4000/Cliente?Usuario=${formData.Usuario}`);

      if (response.data.length > 0) {
        const usuario = response.data.find(user => user.Usuario === formData.Usuario);

        if (usuario && usuario.Contraseña === formData.Contraseña) {
          localStorage.setItem('cliente', JSON.stringify(usuario));
          toast.success("Éxito al iniciar sesión", {
            className: 'toast-success', // Clase personalizada para éxito
          });
          navigate('/BienvenidaCliente');
        } else {
          toast.error("Contraseña incorrecta", {
            className: 'toast-error', // Clase personalizada para error
          });
        }
      } else {
        toast.warning("Usuario no encontrado", {
          className: 'toast-warning', // Clase personalizada para advertencia
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al intentar iniciar sesión", {
        className: 'toast-error', // Clase personalizada para error
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const goToWelcomePage = () => {
    navigate('/PaginaBienvenida'); 
  };

  return (
    <div className="logins">
      <button onClick={goToWelcomePage} className="back-button">
        &larr; Volver
      </button>
      <h2>¡Ingresa ahora!</h2>
      <form onSubmit={enviar}>
        <input
          value={formData.Usuario}
          onChange={handleChange}
          type="text"
          placeholder="Usuario"
          className="form-control"
          name="Usuario"
          required
        />
        <input
          value={formData.Contraseña}
          onChange={handleChange}
          type="password"
          className="form-control"
          placeholder="Contraseña"
          name="Contraseña"
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <br></br>
      <div className="register-link">
        <p>¿No tienes una cuenta? <Link to="/registroCliente">¡Regístrate aquí!</Link></p>
      </div>
      
      {/* Contenedor para las notificaciones */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
}

export default LoginCliente;
