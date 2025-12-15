import { connectToDatabase } from "../../../../lib/mongoose";
import Negocio from "../../../../lib/models/Negocio";
import Promocion from "../../../../lib/models/Promocion";

export const dynamic = 'force-dynamic';

export default async function AdminPanel() {
  await connectToDatabase();

  const totalNegocios = await Negocio.countDocuments();
  const totalPromos = await Promocion.countDocuments();
  const ultimosNegocios = await Negocio.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <main style={{ padding: 20 }}>
      <h1>Panel Administrador</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        <div style={statCard}>
          <h3>Total negocios</h3>
          <p style={statNum}>{totalNegocios}</p>
        </div>
        <div style={statCard}>
          <h3>Total promociones</h3>
          <p style={statNum}>{totalPromos}</p>
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2>Últimos negocios</h2>
        <ul>
          {ultimosNegocios.map((n) => (
            <li key={n._id} style={{ marginBottom: 8 }}>
              {n.nombre} — {n.plan} — {n.visitas ?? 0} visitas
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

const statCard = {
  background: "#0b0b0b",
  padding: 12,
  borderRadius: 10,
  color: "#fff",
  border: "1px solid #222",
};
const statNum = { fontSize: 22, fontWeight: 800, marginTop: 6 };
