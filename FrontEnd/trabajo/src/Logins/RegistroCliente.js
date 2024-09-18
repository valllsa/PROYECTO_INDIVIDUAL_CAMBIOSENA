import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../Estilos/estilosAlerts.css'; 

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
        // Notificación de éxito en verde
        toast.success("Solicitud enviada, espere la confirmación del administrador", {
          className: 'toast-success', // Clase personalizada para éxito
        });
        setTimeout(() => {
          navigate("/");
        }, 3000); // Redirige después de 3 segundos
      }
    } catch (error) {
      console.error(error);
      // Notificación de error en rojo
      toast.error("Ocurrió un error al enviar la solicitud", {
        className: 'toast-error', // Clase personalizada para error
      });
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
    <div className="register">
        <h2>Enviar solicitud para creación de cuenta</h2>
        <form onSubmit={enviar}>
          <div>
            <input
              type="text"
              className="form-control bg-white text-dark border-secondary"
              name="Nombre"
              required
              placeholder="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              className="form-control bg-whit text-dark border-secondary"
              name="NumeroDocumento"
              required
              placeholder="Número Documento"
              value={formData.NumeroDocumento}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              className="form-control bg-white text-dark border-secondary"
              name="Teléfono"
              required
              placeholder="Número Telefónico"
              value={formData.Teléfono}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control bg-white text-dark border-secondary"
              name="Correo"
              required
              placeholder="Correo Electrónico"
              value={formData.Correo}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-light btn-block bg-gray">
              Enviar solicitud
            </button>
          </div>
        </form>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default RegistroCliente;
