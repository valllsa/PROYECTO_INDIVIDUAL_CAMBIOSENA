import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles_admin.css'

const Solicitudes = () => {
  const [currentRecords, setCurrentRecords] = useState([]);
  const [data, setData] = useState({
    Nombre: "",
    NumeroDocumento: "",
    Teléfono: "",
    Correo: "",
    Usuario: "",
    Contraseña: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Solicitudes");
        console.log(response.data); 
        setCurrentRecords(response.data);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      }
    };

    fetchData();
  }, []);

  const enviar = async (e) => {
    e.preventDefault();

    try {
      const response1 = await axios.post("http://localhost:4000/Cliente", {
        Nombre: data.Nombre,
        Teléfono: data.Teléfono,
        Correo: data.Correo,
        NumeroDocumento: data.NumeroDocumento,
        Usuario: data.Usuario,
        Contraseña: data.Contraseña,
      });

      const response2 = await axios.delete(
        `http://localhost:4000/Solicitudes/${data.NumeroDocumento}`
      );

      if (response1.status === 201 && response2.status === 200) {
        alert("Solicitud aprobada");
        setCurrentRecords(
          currentRecords.filter(
            (record) => record.NumeroDocumento !== data.NumeroDocumento
          )
        );
      }
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
      alert("Ocurrió un error al aprobar la solicitud");
    }
  };

  const cancelarEnviar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:4000/Solicitudes/${data.NumeroDocumento}`
      );

      if (response.status === 200) {
        alert("Solicitud cancelada");
        setCurrentRecords(
          currentRecords.filter(
            (record) => record.NumeroDocumento !== data.NumeroDocumento
          )
        );
      }
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      alert("Ocurrió un error al cancelar la solicitud");
    }
  };

  const handleLogout = () => {
    alert("Redirigiendo a la página de inicio de sesión...");
    window.location.href = '/PaginaBienvenida'; 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Tu Marca</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/solicitudes">Solicitudes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MainAdmin">Camiones</Link>
              </li>
            </ul>
            <div className="ml-auto d-flex align-items-center">
              <button type="button" onClick={handleLogout} className="btn btn-primary">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
    
      <div className="accordion" id="accordionExample">
        {currentRecords.length === 0 ? (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse"
                aria-expanded="false"
                aria-controls="collapse"
              >
                No hay solicitudes
              </button>
            </h2>
            <div
              id="collapse"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
        ) : (
          currentRecords.map((record, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + index}
                  aria-expanded="false"
                  aria-controls={"collapse" + index}
                >
                  Solicitud de creación de cuenta número {index + 1}
                </button>
              </h2>
              <div
                id={"collapse" + index}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="d-flex flex-column">
                  <div className="w-100">
                    <div className="accordion-body">
                      <ul className="list-group">
                        <li className="list-group-item">{`Nombre: ${record.Nombre}`}</li>
                        <li className="list-group-item">{`Número de documento: ${record.NumeroDocumento}`}</li>
                        <li className="list-group-item">{`Teléfono: ${record.Teléfono}`}</li>
                        <li className="list-group-item">{`Correo: ${record.Correo}`}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <div className="mb-3 mx-2">
                      <form onSubmit={enviar}>
                        <button
                          onClick={() =>
                            setData({
                              Nombre: record.Nombre,
                              Teléfono: record.Teléfono,
                              Correo: record.Correo,
                              NumeroDocumento: record.NumeroDocumento,
                              Usuario: record.Nombre + record.NumeroDocumento,
                              Contraseña: record.NumeroDocumento,
                            })
                          }
                          type="submit"
                          className="btn btn-success m-0"
                        >
                          Aprobar
                        </button>
                      </form>
                    </div>
                    <div className="mx-4">
                      <form onSubmit={cancelarEnviar}>
                        <button
                          onClick={() =>
                            setData({
                              NumeroDocumento: record.NumeroDocumento,
                            })
                          }
                          type="submit"
                          className="btn btn-danger"
                        >
                          Cancelar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Solicitudes;