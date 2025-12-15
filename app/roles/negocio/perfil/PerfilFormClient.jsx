"use client";
import { useState } from "react";

export default function PerfilFormClient({ negocio }) {
  const [form, setForm] = useState({
    nombre: negocio?.nombre || "",
    telefono: negocio?.telefono || "",
    descripcion: negocio?.descripcion || "",
    direccion: negocio?.direccion || "",
    logoUrl: negocio?.logoUrl || "",
    plan: negocio?.plan || "GRATIS",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/negocio/update", {
        method: "POST",
        body: JSON.stringify({ id: negocio._id, data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar");
      setMsg("Perfil guardado correctamente.");
    } catch (err) {
      setMsg("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <label>Nombre</label>
      <input name="nombre" value={form.nombre} onChange={handleChange} style={input} />
      <label>Teléfono</label>
      <input name="telefono" value={form.telefono} onChange={handleChange} style={input} />
      <label>Dirección</label>
      <input name="direccion" value={form.direccion} onChange={handleChange} style={input} />
      <label>Descripción</label>
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} style={textarea} />
      <label>Logo (URL)</label>
      <input name="logoUrl" value={form.logoUrl} onChange={handleChange} style={input} />
      <label>Plan</label>
      <select name="plan" value={form.plan} onChange={handleChange} style={input}>
        <option value="GRATIS">GRATIS</option>
        <option value="ESENCIAL">ESENCIAL</option>
        <option value="ESTANDAR">ESTANDAR</option>
        <option value="PREMIUM">PREMIUM</option>
      </select>

      <button onClick={handleSave} disabled={saving} style={botonOro}>
        {saving ? "Guardando..." : "Guardar Perfil"}
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}

const input = { width: "100%", padding: 10, marginBottom: 10, borderRadius: 8 };
const textarea = { width: "100%", padding: 10, height: 120, marginBottom: 10, borderRadius: 8 };
const botonOro = {
  background: "#ffd27f",
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
};
