import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Estilos/estilos.css';
import axios from 'axios';

function LoginAdmin() {
  const [formData, setFormData] = useState({
    Usuario: '',
    Contraseña: ''
  });
  const navigate = useNavigate();


  const enviar = async (e) => {
    e.preventDefault();

    try {
      // Solicitud GET para obtener los datos del usuario
      const response = await axios.get(`http://localhost:4000/Cliente?Usuario=${formData.Usuario}`);
      
      if (response.data.length > 0) {
      
        const usuario = response.data.find(user => user.Usuario === formData.Usuario);

        if (usuario && usuario.Contrasena === formData.Contrasena) {
          alert("Éxito al iniciar sesión");
          navigate('/BienvenidaCliente');
        } else {
          alert("Contraseña incorrecta");
        }
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar iniciar sesión");
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
    <div className="login-container">
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
    </div>
  );
}

export default LoginAdmin;
