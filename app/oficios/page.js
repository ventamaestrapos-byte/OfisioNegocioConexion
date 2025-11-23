"use client";
import { useState } from "react";

export default function PerfilNegocio() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [logo, setLogo] = useState(null);

  const guardarPerfil = () => {
    alert("Perfil del negocio guardado correctamente (simulado).");
  };

  return (
    <div style={fondo}>
      <div style={card}>
        <h1 style={titulo}>Perfil del Negocio</h1>
        <p style={subtitulo}>
          Administra la información que los clientes verán en tu negocio.
        </p>

        {/* LOGO */}
        <div style={logoContainer}>
          {logo ? (
            <img src={URL.createObjectURL(logo)} style={logoEstilo} />
          ) : (
            <div style={logoPlaceholder}></div>
          )}
        </div>

        <label style={botonSubir}>
          Subir Logo
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </label>

        {/* DATOS */}
        <input
          style={input}
          placeholder="Nombre del negocio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          style={input}
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <input
          style={input}
          placeholder="Dirección completa"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <textarea
          style={textarea}
          placeholder="Descripción del negocio"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>

        <button style={botonOro} onClick={guardarPerfil}>
          Guardar Perfil
        </button>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS NEGRO–ORO PREMIUM */
const fondo = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #000, #0d0d0d)",
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "100%",
  maxWidth: 430,
  background: "rgba(0, 0, 0, 0.75)",
  borderRadius: 22,
  border: "1px solid #d4af37",
  padding: 25,
  color: "#fff",
  boxShadow: "0 0 20px rgba(212,175,55,0.3)",
};

const titulo = {
  fontSize: 28,
  fontWeight: 800,
  color: "#f5d27f",
  textAlign: "center",
  marginBottom: 10,
};

const subtitulo = {
  fontSize: 14,
  textAlign: "center",
  opacity: 0.8,
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginBottom: 12,
  background: "#111",
  color: "#fff",
};

const textarea = {
  width: "100%",
  minHeight: 90,
  padding: 12,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginBottom: 15,
  background: "#111",
  color: "#fff",
};

const botonOro = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(135deg, #ffb347, #ffd27f)",
  border: "none",
  borderRadius: 15,
  color: "#2b1c03",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16,
};

const logoContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 10,
};

const logoPlaceholder = {
  width: 120,
  height: 120,
  background: "#111",
  borderRadius: 14,
  border: "2px solid #d4af37",
};

const logoEstilo = {
  width: 120,
  height: 120,
  objectFit: "cover",
  borderRadius: 14,
  border: "2px solid #d4af37",
};

const botonSubir = {
  display: "block",
  textAlign: "center",
  padding: 10,
  background: "#d4af37",
  color: "#000",
  borderRadius: 14,
  marginBottom: 20,
  cursor: "pointer",
  fontWeight: "bold",
};