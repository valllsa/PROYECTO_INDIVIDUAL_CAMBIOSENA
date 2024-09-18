import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// CLIENTE
import PaginaBienvenida from './Logins/PaginaBienvenida';
import LoginCliente from './Logins/LoginCliente';
import RegistroCliente from './Logins/RegistroCliente';
import BienvenidaCliente from './VistaCliente/BienvenidaCliente';
import MainCliente from './VistaCliente/MainCliente';

// ADMINISTRADOR
import LoginAdmin from './Logins/LoginAdmin';
import MainAdmin from './VistaAdmin/MainAdmin';
import Solicitudes from './VistaAdmin/solicitudes';
import Clientes from './VistaAdmin/Clientes';
import Transportadores from './VistaAdmin/Transportadores';
import DueñoCam from './VistaAdmin/DueñoCam';

// TRANSPORTADOR
import LoginTrans from './Logins/LoginTrans';
import MainTrans from './VistaTrans/MainTrans';
import SolicitudCli from './VistaTrans/SolicitudCli';

// DUEÑO CAMION
import LoginDcamion from './Logins/LoginDcamion';
import ConsultarEstado from './VistaDcamion/ConsultarEstado';
import VerReportesCamiones from './VistaDcamion/reportesCam';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaBienvenida />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/loginCliente" element={<LoginCliente />} />
          <Route path="/registroCliente" element={<RegistroCliente />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginTrans" element={<LoginTrans />} />
          <Route path="/loginDcamion" element={<LoginDcamion />} />
          <Route path="/MainAdmin" element={<MainAdmin />} />
          <Route path="/MainCliente" element={<MainCliente />} />
          <Route path="/MainTrans" element={<MainTrans />} />
          <Route path="/BienvenidaCliente" element={<BienvenidaCliente />} />
          <Route path="/SolicitudCli" element={<SolicitudCli />} />
          <Route path="/ConsultarEstado" element={<ConsultarEstado />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Transportadores" element={<Transportadores />} />
          <Route path="/DueñoCam" element={<DueñoCam/>} />
          <Route path="/VerReportesCamiones" element={<VerReportesCamiones/>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
