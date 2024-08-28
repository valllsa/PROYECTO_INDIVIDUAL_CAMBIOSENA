// GestionarMantenimiento.js
import React, { useState } from 'react';
import axios from 'axios';

const GestionarMan= () => {
  const [mantenimiento, setMantenimiento] = useState({
    fechaUltimoMantenimiento: '',
    tipoMantenimiento: '',
    observaciones: '',
  });

  const handleMantenimientoChange = (e) => {
    setMantenimiento({
      ...mantenimiento,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarMantenimiento = async () => {
    try {
      await axios.post("http://localhost:4000/Mantenimiento", mantenimiento);
      alert("Mantenimiento actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el mantenimiento:", error);
      alert("Error al actualizar el mantenimiento.");
    }
  };

  return (
    <div>
      <h2>Mantenimiento y Actualización</h2>
      <div className="form-group">
        <label>Fecha del Último Mantenimiento:</label>
        <input
          type="date"
          name="fechaUltimoMantenimiento"
          value={mantenimiento.fechaUltimoMantenimiento}
          onChange={handleMantenimientoChange}
        />
      </div>
      <div className="form-group">
        <label>Tipo de Mantenimiento:</label>
        <input
          type="text"
          name="tipoMantenimiento"
          value={mantenimiento.tipoMantenimiento}
          onChange={handleMantenimientoChange}
          placeholder="Ej. Cambio de aceite, llantas, revisión general"
        />
      </div>
      <div className="form-group">
        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          value={mantenimiento.observaciones}
          onChange={handleMantenimientoChange}
          placeholder="Añadir observaciones relevantes"
        />
      </div>
      <button onClick={actualizarMantenimiento}>
        Actualizar Mantenimiento
      </button>
    </div>
  );
};

export default GestionarMan;
