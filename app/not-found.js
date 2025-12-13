import Link from "next/link";

export default function NotFound() {
  return (
    <div style={fondo}>
      <div style={card}>
        <h1 style={titulo}>Página no encontrada (404)</h1>
        <p style={subtitulo}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="centered-container" style={{ marginTop: 20 }}>
          <Link href="/conexion" style={botonOro}>
            Ir a Conexión
          </Link>
          <Link href="/" style={botonNegro}>
            Volver al Inicio
          </Link>
        </div>
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
  marginBottom: 12,
};

const subtitulo = {
  fontSize: 14,
  opacity: 0.85,
  marginBottom: 8,
  lineHeight: 1.5,
};

const botonOro = {
  display: "block",
  width: "100%",
  maxWidth: 320,
  padding: "12px 0",
  borderRadius: 18,
  fontSize: 15,
  fontWeight: 700,
  textDecoration: "none",
  textAlign: "center",
  background: "linear-gradient(135deg, #ffb347, #ffd27f, #ffecb3)",
  color: "#2b1c03",
  border: "none",
  boxShadow: "0 8px 18px rgba(255,193,7,0.45)",
};

const botonNegro = {
  display: "block",
  width: "100%",
  maxWidth: 320,
  padding: "12px 0",
  borderRadius: 18,
  fontSize: 15,
  fontWeight: 700,
  textDecoration: "none",
  textAlign: "center",
  background: "rgba(0,0,0,0.6)",
  color: "#f5d27f",
  border: "1px solid #d4af37",
  boxShadow: "0 6px 12px rgba(0,0,0,0.6)",
};
