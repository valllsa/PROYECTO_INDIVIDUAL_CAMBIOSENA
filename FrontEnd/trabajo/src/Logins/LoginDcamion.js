import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../Estilos/estilos.css';
import axios from 'axios';

function LoginDCamion() {
  const [formData, setFormData] = useState({
    Usuario: '',
    Contrasena: ''
  });
  const navigate = useNavigate();


  const enviar = async (e) => {
    e.preventDefault();

    try {
      // Solicitud GET para obtener los datos del usuario
      const response = await axios.get(`http://localhost:4000/Users_DCamion?Usuario=${formData.Usuario}`);
      
      if (response.data.length > 0) {
        const usuario = response.data.find(user => user.Usuario === formData.Usuario);

        if (usuario && usuario.Contrasena === formData.Contrasena) {
          alert("Éxito al iniciar sesión");
          navigate('/GestionarMantenimiento');
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
           value={formData.Contrasena}
           onChange={handleChange}
           type="password"
           className="form-control"
           placeholder="Contraseña"
           name="Contrasena"
           required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginDCamion;
