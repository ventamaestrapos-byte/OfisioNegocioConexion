"use client";
import { useState, useMemo } from "react";

// 🔐 Aquí fijas el plan actual del negocio
// Cuando conectemos backend, esto vendrá de la BD.
// Opciones: "GRATIS" | "ESENCIAL" | "ESTANDAR" | "PREMIUM"
const PLAN_ACTUAL = "PREMIUM";

// Definición de capacidades por plan
const CONFIG_PLANES = {
  GRATIS: {
    nombre: "Plan Gratis",
    puedePrecio: false,
    puedeFoto: false,
    puedeVideo: false,
    puedeFecha: false,
    maxPromos: 1,
    descripcion:
      "Puedes crear 1 promoción simple con título y descripción.",
  },
  ESENCIAL: {
    nombre: "Plan Esencial",
    puedePrecio: true,
    puedeFoto: false,
    puedeVideo: false,
    puedeFecha: true,
    maxPromos: 3,
    descripcion:
      "Hasta 3 promociones con precio y fecha de vencimiento.",
  },
  ESTANDAR: {
    nombre: "Plan Estándar",
    puedePrecio: true,
    puedeFoto: true,
    puedeVideo: false,
    puedeFecha: true,
    maxPromos: 10,
    descripcion:
      "Promociones con foto, precio y fecha. Ideal para negocios activos.",
  },
  PREMIUM: {
    nombre: "Plan Premium",
    puedePrecio: true,
    puedeFoto: true,
    puedeVideo: true,
    puedeFecha: true,
    maxPromos: 50,
    descripcion:
      "Promociones completas: fotos, video, precio, fecha y mayor visibilidad.",
  },
};

export default function NovedadesNegocio() {
  const config = useMemo(() => CONFIG_PLANES[PLAN_ACTUAL], []);
  const [promos, setPromos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const crearPromo = () => {
    if (!titulo || !descripcion) {
      alert("Título y descripción son obligatorios.");
      return;
    }

    if (promos.length >= config.maxPromos) {
      alert(
        `Has alcanzado el máximo de promociones para tu plan (${config.maxPromos}).`
      );
      return;
    }

    const nueva = {
      id: Date.now(),
      titulo,
      descripcion,
      precio: config.puedePrecio ? precio : null,
      fotoUrl: config.puedeFoto ? fotoUrl : null,
      videoUrl: config.puedeVideo ? videoUrl : null,
      fechaFin: config.puedeFecha ? fechaFin : null,
    };

    setPromos([nueva, ...promos]);
    setTitulo("");
    setDescripcion("");
    setPrecio("");
    setFotoUrl("");
    setVideoUrl("");
    setFechaFin("");
  };

  return (
    <div style={fondo}>
      <div style={card}>
        <h1 style={tituloEstilo}>Promociones Exclusivas</h1>
        <p style={subtitulo}>
          Crea y administra las promociones que verán tus clientes dentro de
          la app.
        </p>

        {/* Info del plan actual */}
        <div style={bannerPlan}>
          <p style={{ fontWeight: 700, marginBottom: 4 }}>
            {config.nombre} ({PLAN_ACTUAL})
          </p>
          <p style={{ fontSize: 12, opacity: 0.85 }}>{config.descripcion}</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>
            Máx. promociones activas: <b>{config.maxPromos}</b>
          </p>
        </div>

        {/* FORMULARIO PROMO */}
        <div style={bloqueFormulario}>
          <input
            type="text"
            placeholder="Título de la promoción"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Descripción de la promoción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={textarea}
            rows={3}
          />

          {config.puedePrecio && (
            <input
              type="number"
              placeholder="Precio promocional (MXN)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              style={input}
            />
          )}

          {config.puedeFoto && (
            <input
              type="text"
              placeholder="URL de la foto del producto"
              value={fotoUrl}
              onChange={(e) => setFotoUrl(e.target.value)}
              style={input}
            />
          )}

          {config.puedeVideo && (
            <input
              type="text"
              placeholder="URL del video (Reel, TikTok, etc.)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              style={input}
            />
          )}

          {config.puedeFecha && (
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              style={input}
            />
          )}

          <button style={botonOro} onClick={crearPromo}>
            PUBLICAR PROMOCIÓN
          </button>
        </div>

        {/* LISTADO DE PROMOS */}
        <h2 style={tituloSeccion}>Promociones activas</h2>

        {promos.length === 0 && (
          <p style={{ fontSize: 13, opacity: 0.7 }}>
            Aún no has creado promociones.
          </p>
        )}

        {promos.map((p) => (
          <div key={p.id} style={tarjetaPromo}>
            <h3 style={tituloPromo}>{p.titulo}</h3>
            <p style={texto}>{p.descripcion}</p>

            {p.precio && (
              <p style={precioTexto}>Precio promo: ${p.precio} MXN</p>
            )}

            {p.fotoUrl && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={p.fotoUrl}
                  alt="Foto promo"
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    maxHeight: 180,
                    objectFit: "cover",
                    border: "1px solid #d4af37",
                  }}
                />
              </div>
            )}

            {p.videoUrl && (
              <p style={linkVideo}>
                🎥 Video:{" "}
                <a
                  href={p.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#ffd27f" }}
                >
                  Ver video
                </a>
              </p>
            )}

            {p.fechaFin && (
              <p style={fechaTexto}>Válido hasta: {p.fechaFin}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ESTILOS DE LUJO NEGRO + DORADO */
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
    "0 16px 40px rgba(0,0,0,0.8), 0 0 22px rgba(212,175,55,0.4)",
  padding: 20,
  color: "#fff",
};

const tituloEstilo = {
  fontSize: 24,
  fontWeight: 800,
  color: "#f5d27f",
  textShadow: "0 0 16px rgba(245,210,127,0.8)",
  textAlign: "center",
  marginBottom: 6,
};

const subtitulo = {
  fontSize: 13,
  opacity: 0.8,
  textAlign: "center",
  marginBottom: 18,
};

const bannerPlan = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,0.14), rgba(0,0,0,0.9))",
  borderRadius: 16,
  padding: 10,
  border: "1px solid rgba(212,175,55,0.7)",
  marginBottom: 16,
};

const bloqueFormulario = {
  background: "rgba(0,0,0,0.6)",
  borderRadius: 20,
  padding: 12,
  border: "1px solid rgba(212,175,55,0.3)",
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginTop: 8,
  background: "#050505",
  color: "#fff",
  fontSize: 13,
};

const textarea = {
  width: "100%",
  padding: 10,
  borderRadius: 14,
  border: "1px solid #d4af37",
  marginTop: 8,
  background: "#050505",
  color: "#fff",
  fontSize: 13,
  resize: "none",
};

const botonOro = {
  width: "100%",
  padding: 12,
  borderRadius: 18,
  marginTop: 12,
  background:
    "linear-gradient(135deg, #ffb347, #ffd27f, #ffecb3)",
  border: "none",
  color: "#2b1c03",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 22px rgba(255,193,7,0.6)",
};

const tituloSeccion = {
  color: "#f5d27f",
  marginBottom: 10,
  fontWeight: 700,
  fontSize: 18,
};

const tarjetaPromo = {
  background: "#0a0a0a",
  border: "1px solid #d4af37",
  borderRadius: 18,
  padding: 12,
  marginBottom: 12,
  boxShadow: "0 0 12px rgba(212,175,55,0.25)",
};

const tituloPromo = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 4,
  color: "#f5d27f",
};

const texto = {
  fontSize: 13,
  opacity: 0.9,
};

const precioTexto = {
  fontSize: 14,
  marginTop: 6,
  color: "#ffea9d",
  fontWeight: 700,
};

const fechaTexto = {
  fontSize: 12,
  color: "#cccccc",
  marginTop: 4,
};

const linkVideo = {
  fontSize: 13,
  marginTop: 8,
};
