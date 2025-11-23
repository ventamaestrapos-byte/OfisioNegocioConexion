"use client";

import { useState } from "react";

export default function ReseñasProfesional() {
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [resenas, setResenas] = useState([]);

  const enviarResena = () => {
    if (calificacion === 0 || comentario.trim() === "") {
      alert("Escribe un comentario y selecciona estrellas.");
      return;
    }

    const nueva = {
      id: Date.now(),
      calificacion,
      comentario,
    };

    setResenas([...resenas, nueva]);
    setCalificacion(0);
    setComentario("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Reseñas del Profesional</h2>

      <label>Calificación:</label>
      <select
        value={calificacion}
        onChange={(e) => setCalificacion(Number(e.target.value))}
      >
        <option value="0">Selecciona...</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>

      <br /><br />

      <label>Comentario:</label>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        rows="3"
        style={{ width: "100%" }}
        placeholder="Escribe tu reseña..."
      ></textarea>

      <br /><br />

      <button onClick={enviarResena}>Enviar Reseña</button>

      <hr />

      <h3>Reseñas:</h3>
      {resenas.length === 0 && <p>Aún no hay reseñas.</p>}

      {resenas.map((r) => (
        <div key={r.id} style={{ marginBottom: 15 }}>
          <strong>{"⭐".repeat(r.calificacion)}</strong>
          <p>{r.comentario}</p>
        </div>
      ))}
    </div>
  );
}