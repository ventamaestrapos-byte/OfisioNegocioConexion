"use client";
import { useState } from "react";

export default function DireccionProfesional() {
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [cp, setCp] = useState("");
  const [estado, setEstado] = useState("");

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Dirección del Profesional</h1>

      <input
        style={input}
        type="text"
        placeholder="Calle"
        value={calle}
        onChange={(e) => setCalle(e.target.value)}
      />

      <input
        style={input}
        type="text"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input
        style={input}
        type="text"
        placeholder="Colonia"
        value={colonia}
        onChange={(e) => setColonia(e.target.value)}
      />

      <input
        style={input}
        type="text"
        placeholder="Municipio"
        value={municipio}
        onChange={(e) => setMunicipio(e.target.value)}
      />

      <input
        style={input}
        type="number"
        placeholder="Código Postal"
        value={cp}
        onChange={(e) => setCp(e.target.value)}
      />

      <input
        style={input}
        type="text"
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />

      <button style={btn}>Guardar Dirección</button>
    </main>
  );
}

const input = {
  width: "100%",
  padding: 12,
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: 8,
};

const btn = {
  width: "100%",
  background: "#0070f3",
  padding: 15,
  borderRadius: 10,
  color: "white",
  fontSize: 18,
  border: "none",
  marginTop: 10,
  cursor: "pointer",
};

