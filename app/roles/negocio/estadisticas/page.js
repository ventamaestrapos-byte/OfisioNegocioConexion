import { connectToDatabase } from "../../../../lib/mongoose";
import Negocio from "../../../../lib/models/Negocio";
import Promocion from "../../../../lib/models/Promocion";

export const dynamic = "force-dynamic";

export default async function EstadisticasPage() {
  await connectToDatabase();

  const negocio = await Negocio.findOne().lean();
  if (!negocio) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Estadísticas</h1>
        <p>No se encontró ningún negocio en la BD.</p>
      </main>
    );
  }

  const totalPromos = await Promocion.countDocuments({ negocio: negocio._id });
  const promosActivas = await Promocion.countDocuments({ negocio: negocio._id, activo: true });

  return (
    <main style={{ padding: 20 }}>
      <h1>Estadísticas de {negocio.nombre}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 14 }}>
        <div style={card}>
          <h3>Total de Promociones</h3>
          <p style={big}>{totalPromos}</p>
        </div>
        <div style={card}>
          <h3>Promociones Activas</h3>
          <p style={big}>{promosActivas}</p>
        </div>
        <div style={card}>
          <h3>Visitas al perfil</h3>
          <p style={big}>{negocio.visitas ?? 0}</p>
        </div>
      </div>
    </main>
  );
}

const card = {
  background: "#111",
  padding: 14,
  borderRadius: 12,
  border: "1px solid #333",
  color: "#fff",
};
const big = { fontSize: 28, fontWeight: 800, marginTop: 6 };
