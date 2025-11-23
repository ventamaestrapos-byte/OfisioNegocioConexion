export default function PanelNegocio() {
  return (
    <main style={fondo}>
      <div style={tarjeta}>
        <h1 style={titulo}>Panel Negocio</h1>
        <p style={subtitulo}>
          Administra tu negocio dentro de la app: sube tus productos,
          promociones exclusivas y haz que los clientes te encuentren más fácil.
        </p>

        <a href="/roles/negocio/perfil" style={botonOro}>
          Administrar perfil de negocio
        </a>

        <a href="/roles/negocio/novedades" style={botonNegro}>
          Subir promociones / novedades
        </a>

        <a href="/roles/negocio/estadisticas" style={botonNegro}>
          Ver estadísticas básicas
        </a>

        <p style={nota}>
          Tu tienda también vive en el celular del cliente: haz que te vean
          primero.
        </p>
      </div>
    </main>
  );
}

const fondo = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #3b3b3b 0, #020304 45%, #000000 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const tarjeta = {
  width: "100%",
  maxWidth: 520,
  background: "linear-gradient(145deg, #050608, #171717, #050608)",
  borderRadius: 26,
  border: "1px solid #d4af37",
  boxShadow:
    "0 16px 40px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.45)",
  padding: 24,
  color: "#ffffff",
  textAlign: "center",
};

const titulo = {
  fontSize: 26,
  fontWeight: 800,
  color: "#f5d27f",
  textShadow: "0 0 16px rgba(245,210,127,0.9)",
  marginBottom: 8,
};

const subtitulo = {
  fontSize: 14,
  opacity: 0.85,
  marginBottom: 22,
};

const botonOro = {
  display: "block",
  width: "100%",
  padding: "14px 18px",
  borderRadius: 999,
  fontSize: 15,
  fontWeight: 700,
  textDecoration: "none",
  marginBottom: 12,
  textTransform: "uppercase",
  letterSpacing: 1,
  background:
    "linear-gradient(135deg, #ffb347, #ffd27f, #ffecb3)",
  color: "#2b1c03",
  border: "none",
  boxShadow: "0 10px 22px rgba(255,193,7,0.65)",
};

const botonNegro = {
  display: "block",
  width: "100%",
  padding: "14px 18px",
  borderRadius: 999,
  fontSize: 15,
  fontWeight: 700,
  textDecoration: "none",
  marginBottom: 10,
  textTransform: "uppercase",
  letterSpacing: 1,
  background: "rgba(0,0,0,0.7)",
  color: "#f5d27f",
  border: "1px solid #d4af37",
  boxShadow: "0 8px 18px rgba(0,0,0,0.8)",
};

const nota = {
  fontSize: 12,
  opacity: 0.7,
  marginTop: 10,
};