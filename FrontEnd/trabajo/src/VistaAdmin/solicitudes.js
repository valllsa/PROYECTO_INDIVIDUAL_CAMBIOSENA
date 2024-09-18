import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Solicitudes = () => {
  const location = useLocation();
  const [currentRecords, setCurrentRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Solicitudes");
        setCurrentRecords(response.data);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        toast.error("Error al obtener las solicitudes");
      }
    };

    fetchData();
  }, []);

  const handleAprobar = async (record) => {
    try {
      const response1 = await axios.post("http://localhost:4000/Cliente", {
        Nombre: record.Nombre,
        Telefono: record.Telefono,
        Correo: record.Correo,
        NumeroDocumento: record.NumeroDocumento,
        Usuario: record.Nombre,
        Contrasena: record.NumeroDocumento
      });

      if (response1.status === 201) {
        const response2 = await axios.delete(`http://localhost:4000/Solicitudes/${record.id}`);

        if (response2.status === 200) {
          toast.success("Solicitud aprobada exitosamente");
          setCurrentRecords(currentRecords.filter(r => r.id !== record.id));
        } else {
          toast.error("Error al eliminar la solicitud");
        }
      } else {
        toast.error("Error al guardar el cliente");
      }
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
      toast.error("Ocurrió un error al aprobar la solicitud");
    }
  };

  const handleCancelar = async (record) => {
    try {
      const response = await axios.delete(`http://localhost:4000/Solicitudes/${record.id}`);

      if (response.status === 200) {
        toast.info("Solicitud cancelada");
        setCurrentRecords(currentRecords.filter(r => r.id !== record.id));
      } else {
        toast.error("Error al cancelar la solicitud");
      }
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      toast.error("Ocurrió un error al cancelar la solicitud");
    }
  };

  const handleLogout = () => {
    toast.info("Redirigiendo a la página de inicio de sesión...");
    window.location.href = '/PaginaBienvenida';
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
              <li className="d-flex flex-row">
                <Link className={`nav-link custom-font-size ${location.pathname === '/solicitudes' ? 'active text-white' : ''}`} to="/solicitudes">
                  Solicitudes
                </Link>
              </li>
            </ul>
            <div className="button-logout">
              <button type="button" onClick={handleLogout} className="bg-dark d-flex ml-auto">
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-row h-100">
        {/* Sidebar */}
        <div>
          <div>
            <div className="d-flex flex-column bg-dark" style={{ width: 199, height: 850 }}>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-items">
                  <Link className={`nav-link ${location.pathname === '/MainAdmin' ? 'active text-white' : ''}`} to="/MainAdmin">
                    Camiones
                  </Link>
                </li>
                <li className="nav-items">
                  <Link className={`nav-link ${location.pathname === '/Clientes' ? 'active text-white' : ''}`} to="/Clientes">
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link className={`nav-link ${location.pathname === '/Transportadores' ? 'active text-white' : ''}`} to="/Transportadores">
                    Transportadores
                  </Link>
                </li>
                <li>
                  <Link className={`nav-link ${location.pathname === '/DueñoCam' ? 'active text-white' : ''}`} to="/DueñoCam">
                    Dueños de Camiones
                  </Link>
                </li>
              </ul>
              <hr />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="accordion" id="accordionExample">
            {currentRecords.length === 0 ? (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse">
                    No hay solicitudes
                  </button>
                </h2>
                <div id="collapse" className="accordion-collapse collapse" data-bs-parent="#accordionExample"></div>
              </div>
            ) : (
              currentRecords.map((record, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>
                      Solicitud de creación de cuenta número {index + 1}
                    </button>
                  </h2>
                  <div id={"collapse" + index} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="d-flex flex-column">
                      <div className="w-100">
                        <div className="accordion-body">
                          <ul className="list-group">
                            <li className="list-group-item">{`Nombre: ${record.Nombre}`}</li>
                            <li className="list-group-item">{`Número de documento: ${record.NumeroDocumento}`}</li>
                            <li className="list-group-item">{`Teléfono: ${record.Telefono}`}</li>
                            <li className="list-group-item">{`Correo: ${record.Correo}`}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-end">
                        <button onClick={() => handleAprobar(record)} className="btn btn-success m-2">
                          Aprobar
                        </button>
                        <button onClick={() => handleCancelar(record)} className="btn btn-danger m-2">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Solicitudes;
