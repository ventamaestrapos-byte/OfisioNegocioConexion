export default function Suscripciones() {
  const planes = [
    {
      nombre: "Gratis",
      precio: "$0",
      beneficios: ["1 servicio", "Visibilidad limitada"],
      color: "#999",
    },
    {
      nombre: "Silver",
      precio: "$99 / mes",
      beneficios: ["3 servicios", "Visibilidad normal", "Chat básico"],
      color: "#00aaff",
    },
    {
      nombre: "Gold",
      precio: "$199 / mes",
      beneficios: ["Servicios ilimitados", "Alta visibilidad", "Chat completo"],
      color: "#ffaa00",
    },
    {
      nombre: "Premium",
      precio: "$299 / mes",
      beneficios: [
        "Servicios ilimitados",
        "Máxima visibilidad",
        "Chat completo",
        "Ubicación resaltada",
      ],
      color: "#ff0066",
    },
  ];

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Planes de Suscripción</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: 30,
        }}
      >
        {planes.map((p, i) => (
          <div
            key={i}
            style={{
              padding: 20,
              borderRadius: 15,
              background: p.color,
              color: "white",
            }}
          >
            <h2>{p.nombre}</h2>
            <h3>{p.precio}</h3>

            <ul>
              {p.beneficios.map((b, x) => (
                <li key={x}>{b}</li>
              ))}
            </ul>

            <button
              style={{
                marginTop: 10,
                padding: 12,
                width: "100%",
                borderRadius: 10,
                border: "none",
                background: "white",
                color: p.color,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Adquirir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
