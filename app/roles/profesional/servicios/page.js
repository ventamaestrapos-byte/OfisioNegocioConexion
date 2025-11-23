"use client";

import { useState } from "react";

export default function ServiciosProfesional() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const agregarServicio = () => {
    if (!nombre || !precio) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      precio,
    };

    setServicios([...servicios, nuevo]);
    setNombre("");
    setPrecio("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Servicios del Profesional</h2>

      <label>Nombre del servicio:</label>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <br /><br />

      <label>Precio:</label>
      <input value={precio} onChange={(e) => setPrecio(e.target.value)} />

      <br /><br />

      <button onClick={agregarServicio}>Agregar Servicio</button>

      <hr />

      <h3>Servicios:</h3>
      {servicios.length === 0 && <p>Aún no hay servicios.</p>}

      {servicios.map((s) => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <strong>{s.nombre}</strong> — ${s.precio}
        </div>
      ))}
    </div>
  );
}