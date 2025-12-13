"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (user === "Abraham" && pass === "Arp15162427") {
      router.push("/roles/admin/panel");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={fondo}>
      <div style={card}>
        <h1 style={titulo}>Login Administrador</h1>
        <p style={subtitulo}>
          Accede al panel de control con tus credenciales de administrador.
        </p>

        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={botonOro}>
          Entrar
        </button>

        {error && <p style={errorTexto}>{error}</p>}
      </div>
    </div>
  );
}

/* Estilos consistentes con el diseño de la app */
const fondo = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #3b3b3b 0, #020304 45%, #000000 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 390,
  background: "linear-gradient(145deg, #050608, #171717, #050608)",
  borderRadius: 26,
  border: "1px solid #d4af37",
  boxShadow: "0 16px 40px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.45)",
  padding: 24,
  color: "#ffffff",
  textAlign: "center",
};

const titulo = {
  fontSize: 24,
  fontWeight: 800,
  color: "#f5d27f",
  textShadow: "0 0 16px rgba(245,210,127,0.8)",
  marginBottom: 8,
};

const subtitulo = {
  fontSize: 13,
  opacity: 0.85,
  marginBottom: 20,
  lineHeight: 1.5,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginBottom: 12,
  background: "#0d0d0d",
  color: "#fff",
  fontSize: 15,
};

const botonOro = {
  width: "100%",
  padding: "12px 0",
  borderRadius: 18,
  fontSize: 15,
  fontWeight: 700,
  textAlign: "center",
  background: "linear-gradient(135deg, #ffb347, #ffd27f, #ffecb3)",
  color: "#2b1c03",
  border: "none",
  boxShadow: "0 8px 18px rgba(255,193,7,0.45)",
  cursor: "pointer",
  marginTop: 8,
};

const errorTexto = {
  color: "#ff6b6b",
  fontSize: 13,
  marginTop: 12,
  fontWeight: 600,
};
