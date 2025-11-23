"use client";
import { useState } from "react";

export default function Conexion() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [profesionales, setProfesionales] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [verLista, setVerLista] = useState(false);

  // Orden de prioridad de los planes
  const ordenPlan = {
    PREMIUM: 1,
    ESTANDAR: 2,
    ESENCIAL: 3,
    GRATIS: 4,
  };

  // Datos simulados (luego se conectan a BD)
  const dataProfesionales = [
    {
      nombre: "Juan Electricista",
      oficio: "electricista",
      plan: "PREMIUM",
      iconoMapa: "👑📍",
      iconoLista: "👑",
    },
    {
      nombre: "Carlos Plomero",
      oficio: "plomero",
      plan: "GRATIS",
      iconoMapa: "📍",
      iconoLista: "🛠️",
    },
  ];

  const dataNegocios = [
    {
      nombre: "Ferretería Los Amigos",
      tipo: "Ferretería",
      afiliado: true,
      iconoMapa: "🏪📍",
    },
    {
      nombre: "Refaccionaria Express",
      tipo: "Refacciones",
      afiliado: true,
      iconoMapa: "🏪📍",
    },
  ];

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Tu dispositivo no permite ubicación.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {
        alert("Error obteniendo ubicación.");
      }
    );
  };

  const buscarProfesionales = () => {
    const filtro = busqueda.toLowerCase().trim();

    const filtrados = dataProfesionales
      .filter(
        (p) =>
          p.oficio.toLowerCase().includes(filtro) ||
          p.nombre.toLowerCase().includes(filtro)
      )
      .sort((a, b) => {
        const pa = ordenPlan[a.plan] ?? 99;
        const pb = ordenPlan[b.plan] ?? 99;
        return pa - pb;
      });

    setProfesionales(filtrados);
    setNegocios(dataNegocios);
    setVerLista(true);
  };

  const hayResultados =
    profesionales.length > 0 || negocios.length > 0;

  return (
    <div style={fondo}>
      <div style={card}>
        <h1 style={titulo}>Conexión</h1>
        <p style={subtitulo}>
          Encuentra profesionales y negocios afiliados cerca de ti, con
          prioridad a los planes <b>PREMIUM</b>.
        </p>

        {/* BOTÓN UBICACIÓN */}
        <button onClick={obtenerUbicacion} style={botonOro}>
          Obtener mi ubicación
        </button>

        {/* MAPA */}
        {lat && lng && (
          <div style={{ marginTop: 20 }}>
            <iframe
              width="100%"
              height="260"
              style={{
                borderRadius: 16,
                border: "2px solid #d4af37",
                boxShadow: "0 0 18px rgba(212,175,55,0.4)",
              }}
              // Versión que funciona sin API KEY
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=15&output=embed`}
            ></iframe>
          </div>
        )}

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Busca un oficio (Ej: carpintero, electricista)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={input}
        />

        <button onClick={buscarProfesionales} style={botonNegro}>
          Buscar profesionales
        </button>

        {hayResultados && (
          <button
            onClick={() => setVerLista(!verLista)}
            style={botonLista}
          >
            {verLista ? "Ocultar lista" : "Ver lista completa"}
          </button>
        )}

        {/* LISTA COMPLETA */}
        {hayResultados && verLista && (
          <div style={{ marginTop: 20 }}>
            <h2 style={tituloSeccion}>Profesionales encontrados</h2>

            {profesionales.map((p, index) => (
              <div
                key={index}
                style={
                  p.plan === "PREMIUM" ? tarjetaPremium : tarjeta
                }
              >
                <p style={nombrePro}>
                  {p.iconoLista} {p.nombre}
                </p>
                <p style={texto}>Oficio: {p.oficio}</p>
                <p
                  style={
                    p.plan === "PREMIUM" ? planPremium : planGratis
                  }
                >
                  Plan: {p.plan}
                </p>
                {p.plan === "PREMIUM" && (
                  <p style={badgePromo}>
                    ⚡ Aparece primero y puede mostrar promociones
                    destacadas.
                  </p>
                )}
              </div>
            ))}

            <h2 style={tituloSeccion}>Negocios afiliados cerca</h2>

            {negocios.map((n, index) => (
              <div key={index} style={tarjetaNegocio}>
                <p style={nombrePro}>
                  🏪 {n.nombre}
                </p>
                <p style={texto}>{n.tipo}</p>
                <p style={textoChico}>
                  Negocio afiliado a Oficio Negocio Conexión.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ESTILOS PREMIUM NEGRO + ORO */
const fondo = {
  minHeight: "100vh",
  padding: 20,
  background:
    "radial-gradient(circle at top, #3b3b3b 0, #020304 45%, #000 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "system-ui, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 430,
  background: "linear-gradient(145deg, #050608, #141414, #050608)",
  borderRadius: 26,
  border: "1px solid #d4af37",
  boxShadow:
    "0 16px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.35)",
  padding: 20,
  color: "#fff",
};

const titulo = {
  fontSize: 26,
  fontWeight: 800,
  color: "#f5d27f",
  textShadow: "0 0 16px rgba(245,210,127,0.8)",
  textAlign: "center",
  marginBottom: 8,
};

const subtitulo = {
  fontSize: 14,
  opacity: 0.8,
  textAlign: "center",
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginTop: 18,
  marginBottom: 12,
  background: "#0d0d0d",
  color: "#fff",
};

const botonOro = {
  width: "100%",
  padding: 14,
  borderRadius: 18,
  marginTop: 10,
  background:
    "linear-gradient(135deg, #ffb347, #ffd27f, #ffecb3)",
  border: "none",
  color: "#2b1c03",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 22px rgba(255,193,7,0.6)",
};

const botonNegro = {
  width: "100%",
  padding: 14,
  borderRadius: 18,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid #d4af37",
  color: "#f5d27f",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 14,
  boxShadow: "0 8px 18px rgba(0,0,0,0.7)",
  marginBottom: 8,
};

const botonLista = {
  width: "100%",
  padding: 10,
  borderRadius: 16,
  background: "rgba(212,175,55,0.12)",
  border: "1px solid rgba(212,175,55,0.7)",
  color: "#f5d27f",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 13,
  marginBottom: 4,
};

const tituloSeccion = {
  color: "#f5d27f",
  marginTop: 20,
  marginBottom: 10,
  fontWeight: 700,
  fontSize: 18,
};

const tarjeta = {
  background: "#0a0a0a",
  border: "1px solid #d4af37",
  borderRadius: 18,
  padding: 12,
  marginBottom: 12,
  boxShadow: "0 0 12px rgba(212,175,55,0.25)",
};

const tarjetaPremium = {
  ...tarjeta,
  border: "1px solid #ffecb3",
  boxShadow: "0 0 20px rgba(255,236,179,0.4)",
};

const tarjetaNegocio = {
  background: "#1a1a1a",
  border: "1px solid #d4af37",
  borderRadius: 18,
  padding: 12,
  marginBottom: 12,
};

const nombrePro = {
  fontSize: 16,
  fontWeight: 700,
  color: "#f5d27f",
};

const texto = {
  fontSize: 14,
  opacity: 0.85,
};

const textoChico = {
  fontSize: 12,
  opacity: 0.7,
};

const planPremium = {
  fontSize: 13,
  color: "#ffea9d",
  fontWeight: 700,
};

const planGratis = {
  fontSize: 13,
  color: "#bbbbbb",
};

const badgePromo = {
  marginTop: 6,
  fontSize: 12,
  color: "#ffecb3",
};

