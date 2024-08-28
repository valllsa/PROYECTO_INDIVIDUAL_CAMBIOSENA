// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginCliente from './Logins/LoginCliente';
import RegistroCliente from './Logins/RegistroCliente';
import LoginAdmin from './Logins/LoginAdmin';
import LoginTrans from './Logins/LoginTrans';
import LoginDcamion from './Logins/LoginDcamion';
import PaginaBienvenida from './Logins/PaginaBienvenida'; 
import Solicitudes from './VistaAdmin/solicitudes';
import MainCliente from './VistaCliente/MainCliente';
import BienvenidaAdmin from './VistaAdmin/BienvenidaAdmin';
import MainAdmin from './VistaAdmin/MainAdmin';
import MainTrans from './VistaTrans/MainTrans';
import MainDcamion from './VistaDcamion/MainDcamion';
import GestionarMan from './VistaDcamion/GestionarMan';

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
        <Route path="/MainDcamion" element={<MainDcamion />} />
        <Route path="/GestionarMan" element={<GestionarMan />} />
        {/* Redirige cualquier ruta no definida a la página de bienvenida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
