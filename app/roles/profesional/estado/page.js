"use client";
import { useState } from "react";

export default function EstadoProfesional() {
  // ESTADOS POSIBLES: "pendiente", "aprobado", "rechazado"
  const [estado, setEstado] = useState("pendiente");

  const colores = {
    pendiente: "#ffaa00",
    aprobado: "#00cc44",
    rechazado: "#ff0033",
  };

  const textos = {
    pendiente: "Tu perfil está en revisión por el administrador.",
    aprobado: "Tu perfil ha sido aprobado. Ya eres visible para los clientes.",
    rechazado: "Tu perfil fue rechazado. Edita tu información y vuelve a enviar.",
  };

  return (
    <main style={{ padding: 20, textAlign: "center" }}>
      <h1>Estado de Aprobación</h1>

      <div
        style={{
          background: colores[estado],
          padding: 20,
          borderRadius: 20,
          color: "white",
          marginTop: 20,
        }}
      >
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{estado}</h2>
        <p>{textos[estado]}</p>
      </div>
    </main>
  );
}
