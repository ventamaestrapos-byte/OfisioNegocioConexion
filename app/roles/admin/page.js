"use client";

export default function Admin() {
  return (
    <div style={styles.fondo}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Panel Administrador</h1>
        <p style={styles.subtitulo}>
          Control total de la plataforma: aprobaciones, bloqueos, revisión de
          perfiles y control de la calidad del servicio.
        </p>

        <button style={styles.botonPrincipal}>VER SOLICITUDES PENDIENTES</button>
        <button style={styles.botonSecundario}>GESTIONAR PROFESIONALES Y NEGOCIOS</button>
        <button style={styles.botonSecundario}>AJUSTES GENERALES DE LA APP</button>

        <p style={styles.textoRol}>
          Esta sección es solo para ti: administra Oficio Negocio Conexión de forma
          segura y profesional.
        </p>
      </div>
    </div>
  );
}

const styles = {
  fondo: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #3b3b3b 0, #020304 45%, #000000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    background: "linear-gradient(145deg, #050608 0%, #171717 40%, #050608 100%)",
    borderRadius: 26,
    border: "1px solid #d4af37",
    boxShadow:
      "0 16px 40px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.35)",
    padding: "26px 22px 30px",
    textAlign: "center",
    color: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 6,
    color: "#f5d27f",
    textShadow: "0 0 16px rgba(245,210,127,0.8)",
  },
  subtitulo: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 22,
  },
  botonPrincipal: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 18,
    border: "none",
    marginBottom: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    color: "#2b1c03",
    background:
      "linear-gradient(135deg, #ffb347 0%, #ffd27f 40%, #ffecb3 100%)",
    boxShadow: "0 10px 22px rgba(255, 193, 7, 0.6)",
  },
  botonSecundario: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 18,
    border: "1px solid rgba(245,245,245,0.4)",
    marginBottom: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    color: "#f5f5f5",
    background: "rgba(0,0,0,0.6)",
    boxShadow: "0 8px 18px rgba(0,0,0,0.7)",
  },
  textoRol: {
    fontSize: 12,
    opacity: 0.75,
    marginTop: 8,
  },
};
