export default function Home() {
  return (
    <main style={fondo}>
      <div style={tarjeta}>
        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src="/logo.png"
            alt="Oficio Negocio Conexión"
            style={{
              width: 140,
              height: 140,
              borderRadius: "999px",
              objectFit: "cover",
              boxShadow: "0 0 25px rgba(212,175,55,0.9)",
              border: "3px solid #d4af37",
            }}
          />
        </div>

        <h1 style={titulo}>Oficio Negocio Conexión</h1>
        <p style={subtitulo}>
          Conecta con profesionales, negocios y clientes en una sola app.
        </p>

        {/* BOTONES PRINCIPALES */}
        <a href="/roles" style={botonOro}>
          Seleccionar Rol
        </a>

        <a href="/roles/usuario" style={botonNegro}>
          Cliente – Explorar
        </a>

        <a href="/roles/profesional" style={botonNegro}>
          Profesional – Ingresar
        </a>

        <a href="/roles/negocio" style={botonNegro}>
          Negocio – Administrar
        </a>

        <p style={nota}>
          También puedes entrar como Cliente, Profesional o Negocio desde el menú.
        </p>
      </div>
    </main>
  );
}

/* ESTILOS NEGRO + ORO */
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
  maxWidth: 480,
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