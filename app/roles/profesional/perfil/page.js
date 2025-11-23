"use client";

import { useState } from "react";

export default function PerfilProfesional() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    oficio: "",
    telefono: "",
    descripcion: "",
    foto: null,
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Perfil Profesional</h2>
      <p>Nombre: {perfil.nombre}</p>
      <p>Oficio: {perfil.oficio}</p>
      <p>Teléfono: {perfil.telefono}</p>
      <p>Descripción: {perfil.descripcion}</p>
    </div>
  );
}