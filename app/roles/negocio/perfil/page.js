import { connectToDatabase } from "../../../../lib/mongoose";
import Negocio from "../../../../lib/models/Negocio";
import PerfilFormClient from "./PerfilFormClient";

export const dynamic = 'force-dynamic';

export default async function PerfilNegocioPage() {
  await connectToDatabase();

  const negocio = await Negocio.findOne().lean();

  if (!negocio) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Perfil de Negocio</h1>
        <p>No se encontró ningún negocio en la base de datos. Crea uno desde MongoDB o ejecuta el seed.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 8 }}>Perfil de {negocio.nombre}</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ width: 260 }}>
          {negocio.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={negocio.logoUrl} alt="logo" style={{ width: "100%", borderRadius: 12 }} />
          ) : (
            <div style={{ width: "100%", height: 180, background: "#222", borderRadius: 12 }} />
          )}

          <p style={{ marginTop: 10 }}>
            Plan: <strong>{negocio.plan}</strong>
          </p>
          <p>Visitas: <strong>{negocio.visitas ?? 0}</strong></p>
        </div>

        <div style={{ flex: 1 }}>
          <PerfilFormClient negocio={JSON.parse(JSON.stringify(negocio))} />
        </div>
      </div>
    </main>
  );
}
