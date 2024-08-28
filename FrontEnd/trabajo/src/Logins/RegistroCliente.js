import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../VistaCliente/Estilos.css'; 

function RegistroCliente() {
  const [formData, setFormData] = useState({
    Nombre: '',
    NumeroDocumento: '',
    Teléfono: '',
    Correo: '',
  });

  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();

    try {
      // Solicitud POST para enviar los datos del usuario
      const response = await axios.post(`http://localhost:4000/Solicitudes`, {
        Nombre: formData.Nombre,
        NumeroDocumento: formData.NumeroDocumento,
        Teléfono: formData.Teléfono,
        Correo: formData.Correo,
      });

      if (response.status === 201) {
        alert("Solicitud enviada, espere la confirmación del administrador");
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar la solicitud");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src="ruta/a/tu/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Enviar solicitud para creación de cuenta</p>
            <form onSubmit={enviar}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="Nombre"
                  required
                  placeholder="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="form-control"
                  name="NumeroDocumento"
                  required
                  placeholder="Número Documento"
                  value={formData.NumeroDocumento}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="form-control"
                  name="Teléfono"
                  required
                  placeholder="Número Telefónico"
                  value={formData.Teléfono}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  name="Correo"
                  required
                  placeholder="Correo Electrónico"
                  value={formData.Correo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success btn-block">
                  Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroCliente;
