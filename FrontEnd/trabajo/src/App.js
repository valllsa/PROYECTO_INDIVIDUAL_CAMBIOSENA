import PaginaBienvenida from './Logins/PaginaBienvenida'; 

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginCliente from './Logins/LoginCliente';
import RegistroCliente from './Logins/RegistroCliente';
import BienvenidaCliente from './VistaCliente/BienvenidaCliente';
import MainCliente from './VistaCliente/MainCliente';
import CancelarSer from './VistaCliente/CancelarSer';


import LoginAdmin from './Logins/LoginAdmin';
import BienvenidaAdmin from './VistaAdmin/BienvenidaAdmin';
import MainAdmin from './VistaAdmin/MainAdmin';
import Solicitudes from './VistaAdmin/solicitudes';

import LoginTrans from './Logins/LoginTrans';
import MainTrans from './VistaTrans/MainTrans';
import SolicitudCli from './VistaTrans/SolicitudCli';


import LoginDcamion from './Logins/LoginDcamion';
import GestionarMantenimiento from './VistaDcamion/GestionarMantenimiento';
import ConsultarEstado from './VistaDcamion/ConsultarEstado';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaBienvenida />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/BienvenidaAdmin" element={<BienvenidaAdmin /> } />
        <Route path="/loginCliente" element={<LoginCliente />} />
        <Route path="/registroCliente" element={<RegistroCliente />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/loginTrans" element={<LoginTrans />} />
        <Route path="/loginDcamion" element={<LoginDcamion />} />
        <Route path="/MainAdmin" element={<MainAdmin />} />
        <Route path="/MainCliente" element={<MainCliente />} />
        <Route path="/MainTrans" element={<MainTrans />} />
        <Route path="/GestionarMantenimiento" element={<GestionarMantenimiento />} />
        <Route path="/BienvenidaCliente" element={<BienvenidaCliente/>} />
        <Route path="/SolicitudCli" element={<SolicitudCli/>} />
        <Route path="/ConsultarEstado" element={<ConsultarEstado/>} />
        <Route path="/CancelarSer" element={<CancelarSer/>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
